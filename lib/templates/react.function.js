"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (name, svg) {
  return "const " + name + "Icon = (props) =>\n  " + svg + ";\n\nexport default " + name + "Icon;";
};