# 介绍

> 这是一个非常完全 且完善的SSR 同构方案

# Todo

> 我们需要完成下面的这些事情

❎ simple babel+gulp compile 工程化
❎ base SSR
❎ Vite babel -> es 和 jsx
❎ code splice
❎ ts
❎ 关于缓存
❎ 部署
❎ 压测

# 细节描述

## 处理jsx ssr 的server 问题

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

## base ssr

> 在base ssr 中我们需要完成所有的ssr 相关的事情

1. html SSR
✅ 完成

2. 路由管理
✅ 完成

> 由于静态路由，如果你像下面这样写 这是不行的会导致 不会被渲染 进入不到 render 函数中 它们全部公用一个state。这回引起两个方面的问题
a. 一旦东西交给了 浏览器，那么所有的路由操作都在 浏览器了, 不会再经服务器 有ssr的页面了
b. 路由刷新的时候比如 /production 能够直接ssr 但只能渲染一次，然后就是 浏览器接管路由了
c. 由于 hydrate 和ssr 在 /production 的行为不一致，会导致 页面的闪动，除非你 全部都是用浏览器路由
d. 如果你是用 路由的前置拦截 会导致，所有的page 只会在同一个时间获取同一个数据，抵达浏览器之后就不会再 更新了 有问题

```js
+++1 api
const reactContentStream = render(req.path, data);

+++2 api
const reactContentStream = render(req.path, data);


const App = (props) => {
  const [state, dispatch] = useReducer(reducer, props.data);
  return (
    <StaticRouter location={props.path}>
      <InitStateContext.Provider value={[state, dispatch]}>
        <Router></Router>
      </InitStateContext.Provider>
    </StaticRouter>
  );
};

const render = (path, data) => {
  console.log("渲染", path);
  return renderToString(<App path={path} data={data}></App>);
};

app.use('*', () => {
  .....
})
```

> 有鉴于此 我们考虑了两种处理方案

### 建立 层级

在client 上，我们使用 不同的层级处理

比如 /home 下的路由 包括子路由全部给home 处理，然后在 加上 basename 进行处理, 这样处理的话，意味着我们 对 client 的router 拆分更详细的模块, 建立多个 hydrate bundle 和 ssr render

至于闪动 我们需要想法子 加上loading 处理，对于page 直接的跳转也需要分两种 module 内 和module 外

### 全部Page 同构直出

> 我们决定全 对于所有的页面的路由控制交给server 处理，不做路由同构 ，这样可以把不同的module 弄的 比较独立

dispatch 改动的地方

```js
// 去client/index.js， 干掉路由， 经由 注水的state 去渲染指定的page

```

要解决这个问题需要像下面的这样处理
3. 注水&脱水
✅ 完成

4. 事件绑定和css
✅ 完成
CSS 采用直接 在public 下完成，更高级的做法应该是 css 直接inject 到ssr 模版中, 目前使用的是
react-Helmet, 注入css 的方式注入每个页面所需要的 css

# Vite babel

# Code splice

# ts

# 部署

# 压测
