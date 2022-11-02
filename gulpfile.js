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
  series(clean, _script, _scriptServer, startServer)()
  done()
}

// dev server & client
const server_build = (done) => {
  const watcher = watch(["./src/**/*.js", "./src/**/*.jsx"]);
  watcher.on("change", () => {
    console.log("update file...");
    series(clean, _script, _scriptServer, startServer)()
  });
  done();
};

exports.dev = series(init , server_build);
