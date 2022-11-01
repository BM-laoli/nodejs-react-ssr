"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
var _Home = _interopRequireDefault(require("../client/modules/Home"));
var _Production = _interopRequireDefault(require("../client/modules/Production"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = function _default() {
  return /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Routes, null, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
    path: "/",
    element: /*#__PURE__*/_react["default"].createElement(_Home["default"], null)
  }), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
    path: "/production",
    element: /*#__PURE__*/_react["default"].createElement(_Production["default"], null)
  }));
};
exports["default"] = _default;