"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Router = void 0;
var _react = _interopRequireDefault(require("react"));
var _Hom = _interopRequireDefault(require("../client/page/Home/Hom1"));
var _Hom2 = _interopRequireDefault(require("../client/page/Home/Hom2"));
var _P = _interopRequireDefault(require("../client/page/Production/P1"));
var _P2 = _interopRequireDefault(require("../client/page/Production/P2"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Router = {
  "/home": _Hom["default"],
  "/home2": _Hom2["default"],
  "/p/p1": _P["default"],
  "/p/p2": _P2["default"]
};
exports.Router = Router;