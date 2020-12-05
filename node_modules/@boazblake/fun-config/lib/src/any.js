"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Any = exports.Any = function Any(x) {
  return {
    val: x,
    concat: function concat(_ref) {
      var val = _ref.val;
      return Any(x || val);
    }
  };
};

Any.empty = Any(false);
//# sourceMappingURL=any.js.map