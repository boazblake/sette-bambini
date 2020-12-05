'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uncurry5 = exports.uncurry4 = exports.uncurry3 = exports.uncurry2 = exports.curry5 = exports.curry4 = exports.curry3 = exports.curry2 = exports.tuple5 = exports.tuple4 = exports.tuple3 = exports.tuple2 = exports.Tuple5 = exports.Tuple4 = exports.Tuple3 = exports.Tuple2 = exports.Tuple = undefined;

var _daggy = require('daggy');

var Tuple = exports.Tuple = (0, _daggy.tagged)('_1', '_2');
var Tuple2 = exports.Tuple2 = Tuple;
var Tuple3 = exports.Tuple3 = (0, _daggy.tagged)('_1', '_2', '_3');
var Tuple4 = exports.Tuple4 = (0, _daggy.tagged)('_1', '_2', '_3', '_4');
var Tuple5 = exports.Tuple5 = (0, _daggy.tagged)('_1', '_2', '_3', '_4', '_5');

// Methods
Tuple2.prototype.concat = function (b) {
  return Tuple2(this._1.concat(b._1), this._2.concat(b._2));
};
Tuple3.prototype.concat = function (b) {
  return Tuple3(this._1.concat(b._1), this._2.concat(b._2), this._3.concat(b._3));
};
Tuple4.prototype.concat = function (b) {
  return Tuple4(this._1.concat(b._1), this._2.concat(b._2), this._3.concat(b._3), this._4.concat(b._4));
};
Tuple5.prototype.concat = function (b) {
  return Tuple5(this._1.concat(b._1), this._2.concat(b._2), this._3.concat(b._3), this._4.concat(b._4), this._5.concat(b._5));
};

// Methods
Tuple.prototype.dimap = function (f, g) {
  return Tuple(f(this._1), g(this._2));
};
Tuple.prototype.map = function (f) {
  return Tuple(this._1, f(this._2));
};
Tuple.prototype.curry = function (f) {
  return f(this);
};
Tuple.prototype.uncurry = function (f) {
  return f(this._1, this._2);
};
Tuple.prototype.extend = function (f) {
  return Tuple(this._1, f(this));
};
Tuple.prototype.extract = function () {
  return this._2;
};
Tuple.prototype.foldl = function (f, z) {
  return f(this._2, z);
};
Tuple.prototype.foldr = function (f, z) {
  return f(z, this._2);
};
Tuple.prototype.foldMap = function (f, _) {
  return f(this._2);
};

var tuple2 = exports.tuple2 = Tuple;
var tuple3 = exports.tuple3 = function tuple3(a, b, c) {
  return Tuple(tuple2(a, b), c);
};
var tuple4 = exports.tuple4 = function tuple4(a, b, c, d) {
  return Tuple(tuple3(a, b, c), d);
};
var tuple5 = exports.tuple5 = function tuple5(a, b, c, d, e) {
  return Tuple(tuple4(a, b, c, d), e);
};

var curry2 = exports.curry2 = function curry2(f, a, b) {
  return f(tuple2(a, b));
};
var curry3 = exports.curry3 = function curry3(f, a, b, c) {
  return f(tuple3(a, b, c));
};
var curry4 = exports.curry4 = function curry4(f, a, b, c, d) {
  return f(tuple4(a, b, c, d));
};
var curry5 = exports.curry5 = function curry5(f, a, b, c, d, e) {
  return f(tuple5(a, b, c, d, e));
};

var uncurry2 = exports.uncurry2 = function uncurry2(f, t) {
  return f(t._1, t._2);
};
var uncurry3 = exports.uncurry3 = function uncurry3(f, t) {
  return f(t._1._1, t._1._2, t._2);
};
var uncurry4 = exports.uncurry4 = function uncurry4(f, t) {
  return f(t._1._1._1, t._1._1._2, t._1._2, t._2);
};
var uncurry5 = exports.uncurry5 = function uncurry5(f, t) {
  return f(t._1._1._1._1, t._1._1._1._2, t._1._1._2, t._1._2, t._2);
};
//# sourceMappingURL=tuple.js.map