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
import { PageReactContent } from '../../types';

interface InterPipRender {
  path: string;
  page: PageReactContent;
}

@Injectable()
export class RenderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<string> {
    const [req, res] = context.getArgs<[Request, Response]>();
    const apc = context.getClass<any>().prototype;
    const name = context.getClass<any>().name.replace('Controller', '');
    const PageReactContent = apc.Components[req.path];

    return next.handle().pipe(
      map(this.injectStyle()),
      map(this.injectJS(name)),
      map(this.injectSEO()),
      map(async (value) => {
        return this.pipRender({
          path: req.path,
          page: PageReactContent,
        })(value);
      }),
      from,
    );
  }

  private pipRender = (options: InterPipRender) => {
    return async (initData: any) => {
      initData.page = options.path;

      const appHtml = render(options.page, initData.initState);
      const html = this._HTML(
        appHtml,
        initData.initState,
        initData.SEO,
        initData.links,
        initData.injectJS,
      );
      return html;
    };
  };

  private _HTML(
    reactContentString: string,
    data?: string,
    SEO?: string,
    links?: string,
    injectJS?: string,
  ) {
    return ` 
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      ${SEO || ''}
      ${links || ''}
    </head>
    <body>
      <div id="root"> ${reactContentString} </div>
      <script>
          window.__INIT_STATE__ = ${JSON.stringify(data)};
      </script>
      </body>
      ${injectJS || ''}
    </html>
    `;
  }

  private injectStyle() {
    return (value) => {
      const links = value.links.map((item) => `.` + item) as string[];
      let linkStr = '';
      links.forEach((link) => {
        linkStr += `<link rel="stylesheet" href="${link}">`;
      });
      value.links = linkStr;

      return value;
    };
  }

  private injectJS(name: string) {
    return (value) => {
      value.injectJS = `<script src="./static/webSource/scripts/${name}.client.js"></script>`;
      return value;
    };
  }

  private injectSEO() {
    return (value) => {
      value.SEO = `
      <title>${value.pageInfo.title}</title>
      <description>${value.pageInfo.description}</description>
      `;
      return value;
    };
  }
}
