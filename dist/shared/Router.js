"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PRouter = exports.HRouter = void 0;
var _react = _interopRequireDefault(require("react"));
var _P = _interopRequireDefault(require("../client/modules/Production/page/P1"));
var _P2 = _interopRequireDefault(require("../client/modules/Production/page/P2"));
var _Hom = _interopRequireDefault(require("../client/modules/Home/page/Hom1"));
var _Hom2 = _interopRequireDefault(require("../client/modules/Home/page/Hom2"));
var _reactRouterDom = require("react-router-dom");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var PRouter = function PRouter(props) {
  return /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Routes, {
    basename: props.basename
  }, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
    path: "/pro/",
    element: /*#__PURE__*/_react["default"].createElement(_P["default"], null)
  }), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
    path: "/pro/p2",
    element: /*#__PURE__*/_react["default"].createElement(_P2["default"], null)
  }));
};
exports.PRouter = PRouter;
var HRouter = function HRouter(props) {
  return /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Routes, {
    basename: props.basename
  }, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
    path: "/home/",
    element: /*#__PURE__*/_react["default"].createElement(_Hom["default"], null)
  }), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
    path: "/home/h2",
    element: /*#__PURE__*/_react["default"].createElement(_Hom2["default"], null)
  }));
};
exports.HRouter = HRouter;