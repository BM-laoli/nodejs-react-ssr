"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Link = function Link(props) {
  return /*#__PURE__*/_react["default"].createElement("a", {
    href: props.to
  }, " ", props.children);
};
var _default = Link;
exports["default"] = _default;