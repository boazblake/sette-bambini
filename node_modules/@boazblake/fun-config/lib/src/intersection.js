"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Intersection Semigroup.
//
// The intersection (based on value equality) of two lists
// Intersection :: (Eq m) <= m -> Intersection m
var Intersection = exports.Intersection = function Intersection(xs) {
  return {
    xs: xs,
    concat: function concat(_ref) {
      var ys = _ref.xs;
      return Intersection(xs.filter(function (x) {
        return ys.some(function (y) {
          return y.equals(x);
        });
      }));
    },
    inspect: "Intersection(" + xs + ")"
  };
};
//# sourceMappingURL=intersection.js.map