"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = void 0;
var _react = _interopRequireDefault(require("react"));
var _server = require("react-dom/server");
var _server2 = require("react-router-dom/server");
var _Router = _interopRequireDefault(require("../shared/Router"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var render = function render(path) {
  return (0, _server.renderToString)( /*#__PURE__*/_react["default"].createElement(_server2.StaticRouter, {
    location: path
  }, /*#__PURE__*/_react["default"].createElement(_Router["default"], null)));
};
exports.render = render;