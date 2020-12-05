"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Sum = exports.Sum = function Sum(x) {
  return {
    x: x,
    concat: function concat(_ref) {
      var y = _ref.x;
      return x + y;
    },
    inspect: "Sum(" + x + ")"
  };
};
//# sourceMappingURL=sum.js.map