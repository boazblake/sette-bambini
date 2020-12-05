"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FunConfig = exports.Coyoneda = undefined;

var _all = require("./all");

Object.keys(_all).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _all[key];
    }
  });
});

var _any = require("./any");

Object.keys(_any).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _any[key];
    }
  });
});

var _tuple = require("./tuple");

Object.keys(_tuple).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _tuple[key];
    }
  });
});

var _coyoneda = require("./coyoneda");

Object.defineProperty(exports, "Coyoneda", {
  enumerable: true,
  get: function get() {
    return _coyoneda.Coyoneda;
  }
});

var _pointfree = require("./pointfree");

Object.keys(_pointfree).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _pointfree[key];
    }
  });
});

var _sum = require("./sum");

Object.keys(_sum).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _sum[key];
    }
  });
});

var _list = require("./list");

Object.keys(_list).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _list[key];
    }
  });
});

var _intersection = require("./intersection");

Object.keys(_intersection).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _intersection[key];
    }
  });
});

var _array = require("./array");

var _task = require("./task");

var _maybe = require("./maybe");

var _validation = require("./validation");

var configure = function configure() {
  _array.ArrayFP.configure();
  _task.Task.configure();
  _maybe.Maybe.configure();
  _validation.Validation.configure();
};

var FunConfig = exports.FunConfig = { configure: configure };
//# sourceMappingURL=index.js.map