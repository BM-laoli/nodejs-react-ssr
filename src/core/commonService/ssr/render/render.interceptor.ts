import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { render } from './server';
import { ViteDevServer } from 'vite';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { PageReactContent } from '../../types';


interface InterPipRender {
  req: Request;
  res: Response;
  page: PageReactContent;
  path: string;
  vs: ViteDevServer;
}

@Injectable()
export class RenderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<string> {
    const [req, res] = context.getArgs<[Request, Response]>();
    const apc = context.getClass<any>().prototype;
    const PageReactContent = apc.Components[req.path];
    const vs = req['viteServer'] as ViteDevServer;

    // 如果有 react 渲染印记，请转入渲染函数中执行 ssr
    return next.handle().pipe(
      map(async (value) => {
        return this.pipRender({
          res: res,
          req: req,
          page: PageReactContent,
          path: req.path,
          vs: vs,
        })(value);
      }),
      from,
    );
  }

  private pipRender = (options: InterPipRender) => {
    return async (initData: any) => {
      const { vs, res, req } = options;
      initData.page = options.path;

      // 读取html
      let template = '';

      if (process.env.NODE_ENV_ === 'production') {
        template = readFileSync(
          resolve(__dirname, '../../../static', 'index.html'),
          'utf-8',
        );
      } else {
        template = readFileSync(
          resolve(__dirname, '../../../static', 'index.html'),
          'utf-8',
        );
      }

      // 应用 Vite HTML 转换。这将会注入 Vite HMR 客户端，
      template = await vs.transformIndexHtml(req.originalUrl, template);

      // 得到一段ssr str
      const appHtml = render(options.page, initData);

      const html = template.replace(`<!--ssr-outlet-->`, appHtml);

      // 返回
      return html;
    };
  };

  private htmlTLP = (
    reactContentStream: string,
    data?: any,
    links?: string,
  ) => ` 
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <script type="module" src="/@vite/client"></script>
    <script type="module">
    import RefreshRuntime from "/@react-refresh"
    RefreshRuntime.injectIntoGlobalHook(window)
    window.$RefreshReg$ = () => {}
    window.$RefreshSig$ = () => (type) => type
    window.__vite_plugin_react_preamble_installed__ = true
    </script>

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    ${links || ''}
  </head>
  <body>
    <div id="root"> ${reactContentStream} </div>
    <!-- 注水 -->
    <script>
        window.__INIT_STATE__ = ${JSON.stringify(data)};
    </script>

    <!-- 绑定事件 -->
    <!-- <script src="/client/assets/index.58becadd.js"></script>  -->
    <script type="module" src="/src/share/render/client.tsx"></script>
  </body>
  </html>
  `;
}
