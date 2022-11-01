const path = require("path");
const gulp = require("gulp");
const babelify = require("babelify");
const browserify = require("browserify"); // 插件,
const source = require("vinyl-source-stream"); // 转成stream流
const buffer = require("vinyl-buffer"); // 转成二进制流（buffer）
const { series, parallel } = require("gulp");
const resolveDir = (dir) => path.resolve(__dirname, dir);
const { watch } = require("gulp");
const del = require("gulp-clean");
const pump = require("pump");
const babel = require("gulp-babel");
const { exec, execSync, spawnSync } = require("child_process");

// dev client
const clean_client = (done) => {
  pump([gulp.src("./public/js/*.js"), del()], done);
};
const clean_server = (done) => {
  pump([gulp.src("./dist"), del()], done);
};

const _script = () => {
  return browserify("./src/client/index.js")
    .transform("babelify", {
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

const start = () => {
  if (isOpen) return;
  isOpen = true;

  const scriptPath = (script) => path.join(__dirname, "dist", script);
  execSync(`chmod u+x ./script/nodemon.sh`);
  // 执行一段 shell  就好了 不需要merge
  spawnSync(
    "open",
    [
      "-a",
      "terminal",
      "/Users/administrator/Desktop/origin/react-ssr/SSR-T1/script/nodemon.sh",
    ],
    {
      cwd: path.join(__dirname),
    }
  );
};

// dev server & client
const server_build = (done) => {
  const watcher = watch(["./src/**/*.js"]);
  watcher.on("change", () => {
    console.log("update file...");
    series(clean_client, clean_server, _script, _scriptServer)();
    start();
  });
  done();
};

exports.dev = parallel(server_build);
