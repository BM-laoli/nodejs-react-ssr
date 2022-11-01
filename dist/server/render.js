"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = void 0;
var _server = require("react-dom/server");
var render = function render(component) {
  // 做些什么
  return (0, _server.renderToString)(component);
};
exports.render = render;