"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var All = exports.All = function All(x) {
  return {
    val: x,
    concat: function concat(_ref) {
      var val = _ref.val;
      return All(x && val);
    }
  };
};

All.empty = All(true);
//# sourceMappingURL=all.js.map