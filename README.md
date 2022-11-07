# 介绍

> 这是一个非常完全 且完善的SSR 同构方案

## Todo

> 我们需要完成下面的这些事情

1.base-ssr

- ✅ simple babel+gulp compile 工程化
- ✅ base SSR

2.vite-plugin-ssr

- ✅ Vite babel -> es 和 jsx
- ✅ code splice - eslint peitter
- ✅ ts
- ✅ 关于缓存
- ✅ 压测
- ❎ 部署

3. nest

- ✅ Nest
- ✅ Nest-SSR-Vite

## 细节描述和踩坑

### 处理jsx ssr 的server 问题

> 实际上就是一个问题：“如何编译一些不合法的js ，如何使用babel 并且能获取它的HRM能力 ”, 我们先使用

解决上述问题 只需要简单的配置就好了

```shell
./node_modules/.bin/babel ./src -d ./dist -w
nodemon ./dist
npm-run-all --parallel dev:**
```

实际上我们只需要处理两个事情

1. 客户端 es6 jsx 编译到 nodejs 执行
2. client 单独编译 到js 方便 hydrate

这里也许会有一些不足但是，就目前来说 一个最简单的版本 或许是足够的

```js
const path = require("path");
const gulp = require("gulp");
const babelify = require("babelify");
const browserify = require("browserify"); // 插件,
const source = require("vinyl-source-stream"); // 转成stream流
const buffer = require("vinyl-buffer"); // 转成二进制流（buffer）
const { series } = require("gulp");
const { watch } = require("gulp");
const { exec, execSync, spawnSync } = require("child_process");

// 原产物
const clean = (done) => {
  execSync('rm -rf ./dist')
  execSync('rm -rf ./public/js')
  done()
};

// 构建 浏览器使用的js 绑定事件
const _script = () => {
  return browserify("./src/client/index.js")
    .transform(babelify, {
      presets: ["@babel/preset-env", "@babel/preset-react"],
      plugins: [
        "@babel/plugin-transform-runtime",
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: false }],
      ],
    })
    .bundle()
    .pipe(source("app.js"))
    .pipe(buffer())
    .pipe(gulp.dest("./public/js"));
};

// 构建 node server 需要的 sst
const _scriptServer = (cb) => {
  // 执行一段 shell  就好了 不需要merge
  exec(
    "./node_modules/.bin/babel ./src -d ./dist",
    function (err, stdout, stderr) {
      console.log(stdout);
      cb(err);
    }
  );
};

// cv ejs template
const moveTemplate = (done) => {
  execSync('cp -Rf  ./src/index.ejs  ./dist '  )
  done()
}

// 启动server
let isOpen = false;
const startServer = () => {
  if (isOpen) return;
  isOpen = true;

  const scriptPath = (script) => path.join(__dirname, 'script', script);
  execSync(`chmod u+x ./script/nodemon.sh`);

  // 执行一段 shell  就好了 不需要merge
  spawnSync(
    "open",
    ["-a",
      "terminal",
      scriptPath('nodemon.sh'),
    ],
    {
      cwd: path.join(__dirname),
    }
  );
};

// 初始化
const init = (done) => {
  series(clean, _script, _scriptServer, moveTemplate, startServer)()
  done()
}

// dev server & client
const server_build = (done) => {
  const watcher = watch(["./src/**/*.js"]);
  watcher.on("change", () => {
    console.log("update file...");
    series(clean, _script, _scriptServer, moveTemplate, startServer)()
  });
  done();
};

exports.dev = series(init , server_build);

```

### Base SSR

> 在base ssr 中我们需要完成所有的ssr 相关的事情

1. html SSR
✅ 完成

2. 路由管理
✅ 完成

> 由于静态路由，如果你像下面这样写 这是不行的, 会导致 进入不到 server 的 render 函数中  html 只会返回一次，在这个时候 hydrate 的js 会进入到 browser，接管页面的之后的所有操作，至此server 将不在介入交互的其中

a.  **机制** / 或者其他的ssr 返回， 一旦东西交给了 browser，那么所有的路由操作都在 浏览器了, 不会再经服务器 有ssr的页面了， 之后的所有页面都不在是ssr，和csr 一致

b. **路由同构** 路由刷新的时候比如 从 / ->  /production 由于/进入的时候 浏览器接管路，因此不会进入 server 如果要改变 initState 将不可能

c. **闪动** 由于 hydrate 和ssr 在 /production 的行为不一致，会导致 页面的闪动，原因是：ssr 是production 但 hydrate 初始化的一面 不是同一个dom 结构

```js
// browser
const get_initState = () => {
  return window.__INIT_STATE__;
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, get_initState());

  return (
    <BrowserRouter >
      <InitStateContext.Provider value={[state, dispatch]}>
        <Router></Router>
      </InitStateContext.Provider>
    </BrowserRouter>
  );
};

ReactDom.hydrate(<App></App>, document.getElementById("root"));

// server
const App = (props) => {
  const [state, dispatch] = useReducer(reducer, props.data);
  return (
    <InitStateContext.Provider value={[state, dispatch]}>
      <StaticRouter>
        <Router />
      </StaticRouter>
    </InitStateContext.Provider>
  );
};

const render = (path, data, components) => {
  console.log('render->', path);
  return renderToString(<App data={data} path={path}></App>);
};

app.get("*", async (req, res) => {
  res.setHeader("Content-Type", "text/html");
  const value = await axios.get("http://localhost:3030/api/users");
  const data = {
    name: "",
    page: "",
    message: "",
    list: [],
    // 页面特定的 每个页面都不一样
    data: value.data.data,
  };
  const reactContentStream = render(req.path, data, Home);

  res.send(htmlTLP(reactContentStream, data));
});


```

> 有鉴于此 ，突然发现 除了 第一次ssr 之外，这个ssr 同构好像有点鸡肋， 我们考虑了两种处理方案 ，1. 要么全部同构直出 ，2. 我们是否可以 做权衡，都要一点点🤏 不过分吧, 3. 最优解：如果需要你可以在判断路由的match

#### 建立 层级 (  平衡 )

在client 上，我们使用 不同的层级处理

比如 /home 下的路由 包括子路由全部给home 处理，然后在 加上 basename 进行处理, 这样处理的话，意味着我们 对 client 的router 拆分更详细的模块, 建立多个 hydrate bundle 和 ssr render

至于闪动 我们需要想法子 加上loading 处理，对于page 直接的跳转也需要分两种 module 内 和module 外

```js
// 如果你这样 会有问题

const App = (props) => {
  const [state, dispatch] = useReducer(reducer, props.data);
  return (
    <InitStateContext.Provider value={[state, dispatch]}>
      <StaticRouter location={props.path}>
        {state.basename === "home" && <HRouter basename={state.basename}></HRouter>}
        {state.basename === "pro" && <PRouter basename={state.basename}></PRouter>}
      </StaticRouter>
    </InitStateContext.Provider>
  );
};

//    <HRouter basename={state.basename}></HRouter>

// 这样会有问题 由于 每次 server 回来，都是动态的  HRouter baserName 判断，会导致browser 中的router  不会生效
 app.get("/pro/*", async (req, res) => {
 app.get("/home/*", async (req, res) => {

// 要处理这个问题 就得把他们分多份  比如下面这样子 每个 client 单独搞一个  server 端也单独搞一个
    <InitStateContext.Provider value={[state, dispatch]}>
      <StaticRouter location='home'>
        <HRouter basename={state.basename}></HRouter>
      </StaticRouter>
    </InitStateContext.Provider>

// 然后在 server ssr 匹配到 子路径就不要渲染了，避免闪动 代码就不敲了 这是一种方案

```

> 做完这些之后  基本能够符合我们的要求了

#### 全部Page 同构直出

> 这个的话 就相对的非常的简单了，仅仅是单纯在server 端传入 你需要的组件就好了，在 client，也是如此 这里简单期间 全部打包 📦，然后 用page 判断 (当然后续要做拆分哈 加载当前页面用到的就好了)

```js
// router
import React from 'react';
import Home1 from '../client/page/Home/Hom1'
import Home2 from '../client/page/Home/Hom2'
import P1 from '../client/page/Production/P1'
import P2 from '../client/page/Production/P2'

const Router = {
  "/home" : Home1,
  "/home2" : Home2,
  "/p/p1" : P1,
  "/p/p2" : P2,
};

export  {
  Router
}

// client & server 
+++++
  const Component =  useMemo(() =>{
    const CH  = Router[state.page]  || <></>
    return <CH></CH>
  }, []);

  return (
      <InitStateContext.Provider value={[state, dispatch]}>
        { Component }
      </InitStateContext.Provider>
  );

+++++

// server
app.get('/', (req, res) => {
  res.redirect('/home')
});

app.get("/p/*", async (req, res) => {
  res.setHeader("Content-Type", "text/html");
  const data = {
    name: "",
    page: req.path,
    message: "pro",
    basename: "pro",
    list: [],
    // 页面特定的 每个页面都不一样
    data: [
      {
        email: "861795660@qq.com",
        id: 1,
      },
    ],
  };

  const reactContentStream = render(req.path, data);
  console.log('reactContentStream pro',reactContentStream);
  res.send(htmlTLP(reactContentStream, data));
});


app.get("/home", async (req, res) => {
  res.setHeader("Content-Type", "text/html");
  const data = {
    name: "",
    page: "/home",
    message: "home",
    basename: "home",
    list: [],
    // 页面特定的 每个页面都不一样
    data: [
      {
        email: "861795660@qq.com",
        id: 1,
      },
    ],
  };

  const reactContentStream = render(req.path, data);
  console.log('reactContentStream pro', reactContentStream);
  res.send(htmlTLP(reactContentStream, data));
});

app.get("/home2", async (req, res) => {
  res.setHeader("Content-Type", "text/html");
  const value = await axios.get("http://localhost:3030/api/users");
  const data = {
    name: "",
    page: "/home2",
    message: "",
    basename: "home",
    list: [],
    // 页面特定的 每个页面都不一样
    data: value.data.data,
  };
  const reactContentStream = render(req.path, data);
  console.log("reactContentStream home", reactContentStream);
  res.send(htmlTLP(reactContentStream, data));
});


```
  
3. 注水&脱水
✅ 完成 没有什么需要特别说的

4. 事件绑定和css
✅ 这里先按下不表，后续我们要持续优化下去，
对于这个话题，我选择使用  file 的方式  把 css 直接注入 style 中 ，或者使用link 引入 避免闪动

```js
const injectCssStyle  = () => {
  // 读取 client fs
  return  ''
}

const injectCssLink  = ( links ) => {
  let temp = '';

  links.forEach( (item ) => {
      temp += `<link rel="stylesheet" href="${item}"> </link>
      `
  } )

  return temp
};


const htmlTLP = (reactContentStream, data, links ) => ` 
  <!DOCTYPE html>
  <html lang="en">
  <head>
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
    <script src="/js/app.js"></script> 
  </body>
  </html>
  `;

  app.get("/p/*", async (req, res) => {
  res.setHeader("Content-Type", "text/html");
  const data = {
    name: "",
    page: req.path,
    message: "pro",
    basename: "pro",
    list: [],
    // 页面特定的 每个页面都不一样
    data: [
      {
        email: "861795660@qq.com",
        id: 1,
      },
    ],
  };

  const reactContentStream = render(req.path, data);
  console.log('reactContentStream pro',reactContentStream);
  res.send(htmlTLP(reactContentStream, data, injectCssLink([
    '/style/home/index.css'
  ])));
});
```

> 好，经过上述倒腾之后 大部分东西是没有问题的, 总体而言就是两类 要么全部同构，要么部分同构，接下来我们使用vite 改造一下上面的东西

## Vite babel

> 这里开始我们使用vite 来处理所有工程化的东西，包括原来的gulp 构建流程，在vite 中一个 plugin 几乎完全符合我们的要求

[vite-plugin-ssr](vite-plugin-ssr)

> 我们把code 全部干掉，直接换成它的就好了，如果希望有layout的想过就做几个layout的component 就好了

> 在上述的这个插件中把 下面的东西全部都做了, 且依据文档来看
> 所有的逻辑都具备 比如公共PageLayout的逻辑也给你杭盖了，非常全

✅ code splice
✅ ts
✅ scss
✅ 关于缓存和预构建

## 部署

> 部署很简单，直接build 就好了，然后丢到nodejs 平台上运行，当然你也可以放到容器中去run 都没问题

## 压力测试

> 经过测试 目前无任何防护  测试基准如下

```shell
ab -c200 -n1600 http://127.0.0.1:3000/ 
```

MacBook2019
I5 2.2 GHz 六核Intel Core i7
16GB

稳定在500 上下

## Nest + vite

1. Nest的基础SSR

要修改一点点 🤏 Nest 的ts 配置 把es2017 改成 es5

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2015",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false
  }
}

```

我实现的nest 方案如下方所示 通过 装饰器 + 过滤器 完成, 大概的使用如下， 具体的实现在后面, 从原理上而言非常的简单 ，当Controller class 实例化 的时候，RenderReact就会工作把 组件绑定到类中，当请求了就先看看 有没有class 是否需要render 如果需要就  RenderInterceptor 中render string 就好了， 由于我使用了vite 所以没有使用 自己 的方式，当然第一版本的方案是使用自己render 一个string 和html string 的，我保留了部分代码 你可以自己看

```ts
@Controller()
@UseInterceptors(RenderInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/home')
  @RenderReact(Home)
  home() {
    return {
      name: '',
      message: '',
      list: [],
      data: '',
    };
  }

}

```

- RenderInterceptor

```ts

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
          resolve(__dirname, '../../../client', 'index.html'),
          'utf-8',
        );
      } else {
        template = readFileSync(
          resolve(__dirname, '../../../', 'index.html'),
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

```

- RenderReact

```ts
export const RenderReact = (pageContent: PageReactContent) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return applyDecorators((controller: any, router: string) => {
    // 加上一个属性 标记这个是一个组件 注意它只能为
    controller.Components = {
      [`/${router}`]: pageContent,
      ...controller.Components,
    };
  });
};

```

2. 使用Vite 做中间价 ，它具备了HRM 的能力，也让client 的build 更简单
使用非常的简单 只需 加上这个中间价就好了

```ts
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public')); // 这两个和vite 无关 是nest 自己的static 
  app.useStaticAssets(join(__dirname, '..', 'client'));

  // Vite 中间，为了能在其他的ctx 访问 , viteServer 实例
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use((req, res, next) => {
    req['viteServer'] = vite;
    next();
  });

  app.use(vite.middlewares);

  // 这样就能够选择正确的东西了
  await app.listen(3000);
}
bootstrap();

```

viteConfig, 注意不要写成ts 要不然 nest 的cli 会出问题

```js
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'client',
  },
});

```

## 总结

> 我们先使用node-srr + gulp 完成了一个最简单的SSR 同构方案，这让我们对SSR的核心和路线有了非常全面的了解；然后我们使用vite-plugin-ssr  完成了 基于vite + react  的ssr ，非常的简单！非常的给力，开箱即用；最后我们使用Nest + vite 完成了基于Nest的ssr同构方案，这样的项目架构，甚至都可以成为一个全栈开发的 骨架！我给出了他们的分支对应关系 分别在 base-node, vite_plugin_ssr, nest-ssr, 你可以在分支上找到哦相关的代码 以做参考

## 参考文档

[gulp文档](https://www.gulpjs.com.cn/docs/getting-started/quick-start/)

[bable文档](https://babeljs.io/docs/en/babel-plugin-proposal-object-rest-spread)

[vite文档-如何集成ssr](https://cn.vitejs.dev/guide/ssr.html#setting-up-the-dev-server)

[vite-plugin-ssr](https://github.com/brillout/vite-plugin-ssr)

[nest-webpack-config](https://docs.nestjs.com/cli/monorepo#webpack-options)

[nest-demo官方demo](https://github.com/nestjs/nest/tree/master/sample)
