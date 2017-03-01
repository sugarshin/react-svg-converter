"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (name, svg) {
  return "import React from 'react';\n\nexport default class " + name + "Icon extends React.Component {\n  render() {\n    return (\n      " + svg + "\n    );\n  }\n}";
};