"use strict";

var _express = _interopRequireDefault(require("express"));
var _react = _interopRequireDefault(require("react"));
var _server = require("./server");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ejs = require("ejs");
var _require = require("path"),
  join = _require.join;
var app = (0, _express["default"])();
app.use(_express["default"]["static"]("public"));
app.get("*", function (req, res) {
  res.setHeader("Content-Type", "text/html");
  ejs.renderFile(join(__dirname, 'index.ejs'), {
    title: "home",
    html: (0, _server.render)(req.path),
    data: {
      name: "1",
      page: "2",
      message: '3',
      list: '4',
      // 页面特定的 每个页面都不一样
      data: '5'
    }
  }).then(function (data) {
    res.send(data);
  });
});
app.listen(3030);