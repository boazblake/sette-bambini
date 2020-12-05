"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArrayFP = undefined;

var _util = require("./util");

var _flatten = function _flatten(xs) {
  return xs.reduce(function (a, b) {
    return a.concat(b);
  }, []);
};

var configure = function configure(_) {
  var _fmap = function _fmap(f) {
    var xs = this;
    return xs.map(function (x) {
      return f(x);
    }); //avoid index
  };

  Object.defineProperty(Array.prototype, "fmap", (0, _util.value)(_fmap));

  var _empty = function _empty(_) {
    return [];
  };

  Object.defineProperty(Array.prototype, "empty", (0, _util.value)(_empty));

  var _chain = function _chain(f) {
    return _flatten(this.fmap(f));
  };

  Object.defineProperty(Array.prototype, "chain", (0, _util.value)(_chain));

  var _of = function _of(x) {
    return [x];
  };

  Object.defineProperty(Array.prototype, "of", (0, _util.value)(_of));

  var _ap = function _ap(a2) {
    return _flatten(this.map(function (f) {
      return a2.map(function (a) {
        return f(a);
      });
    }));
  };

  Object.defineProperty(Array.prototype, "ap", (0, _util.value)(_ap));

  var _traverse = function _traverse(f, point) {
    var cons_f = function cons_f(ys, x) {
      return f(x).map(function (x) {
        return function (y) {
          return y.concat(x);
        };
      }).ap(ys);
    };

    return this.reduce(cons_f, point([]));
  };

  Object.defineProperty(Array.prototype, "traverse", (0, _util.value)(_traverse));

  var _any = function _any() {
    return this.length > 0;
  };

  Object.defineProperty(Array.prototype, "any", (0, _util.value)(_any));

  var _insertAt = function _insertAt(idx, x) {
    return this.splice(idx, 0, item);
  };

  Object.defineProperty(Array.prototype, "insertAt", (0, _util.value)(_insertAt));

  var _last = function _last() {
    return this[this.length - 1];
  };

  Object.defineProperty(Array.prototype, "last", (0, _util.value)(_last));

  var _in = function _in(comparer) {
    for (var i = 0; i < this.length; i++) {
      if (comparer(this[i])) return true;
    }
    return false;
  };

  Object.defineProperty(Array.prototype, "in", (0, _util.value)(_in));

  var _pushIfNotExist = function _pushIfNotExist(element, comparer) {
    if (!this.in(comparer)) {
      this.push(element);
    }
  };

  Object.defineProperty(Array.prototype, "pushIfNotExist", (0, _util.value)(_pushIfNotExist));

  var _foldM = function _foldM(point, f) {
    var _this = this;

    var go = function go(a) {
      return !_this.any() ? point(a) : f(a, _this.shift()).chain(go);
    };
    return go;
  };

  Object.defineProperty(Array.prototype, "foldM", (0, _util.value)(_foldM));
};

var ArrayFP = exports.ArrayFP = { configure: configure };
//# sourceMappingURL=array.js.map