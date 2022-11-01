# 介绍

> 这是一个非常完全 且完善的SSR 同构方案

# Todo

> 我们需要完成下面的这些事情

❎ simple babel+gulp compile 工程化
❎ base SSR
❎ Vite babel -> es 和 jsx
❎ code splice
❎ ts
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

// clean
const clean = (done) => {
  execSync('rm -rf ./dist')
  execSync('rm -rf ./public/js')
  done()
};

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

// init 
const init = (done) => {
  series(clean, _script, _scriptServer, startServer)()
  done()
}

// dev server & client
const server_build = (done) => {
  const watcher = watch(["./src/**/*.js"]);
  watcher.on("change", () => {
    console.log("update file...");
    series(clean, _script, _scriptServer, startServer)()
  });
  done();
};

exports.dev = series(init , server_build);

```

## base ssr

> 在base ssr 中我们需要完成所有的ssr 相关的事情

1. html ssg

2. 路由管理

3. 注水&脱水

4. 事件绑定和css

5. css
