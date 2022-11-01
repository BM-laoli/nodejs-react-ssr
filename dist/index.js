"use strict";

var _express = _interopRequireDefault(require("express"));
var _react = _interopRequireDefault(require("react"));
var _Home = _interopRequireDefault(require("./client/modules/Home"));
var _server = require("./server");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var ejs = require("ejs");
var app = (0, _express["default"])();
app.use(_express["default"]["static"]("public"));
app.get("/", function (req, res) {
  res.setHeader("Content-Type", "text/html");
  var html = (0, _server.render)( /*#__PURE__*/_react["default"].createElement(_Home["default"], null));
  ejs.renderFile("../public/index.ejs", {
    title: "home",
    html: html
  }).then(function (data) {
    res.send(data);
  });
});
app.listen(3000);