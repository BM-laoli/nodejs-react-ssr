"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _render = require("./render");
Object.keys(_render).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _render[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _render[key];
    }
  });
});