'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Coyoneda = undefined;

var _daggy = require('daggy');

var _ramda = require('ramda');

var Coyoneda = (0, _daggy.tagged)('x', 'f');

Coyoneda.prototype.map = function (f) {
  return Coyoneda(this.x, (0, _ramda.compose)(f, this.f));
};

Coyoneda.prototype.lower = function () {
  return this.x.map(this.f);
};

Coyoneda.lift = function (x) {
  return Coyoneda(x, _ramda.identity);
};

exports.Coyoneda = Coyoneda;
//# sourceMappingURL=coyoneda.js.map