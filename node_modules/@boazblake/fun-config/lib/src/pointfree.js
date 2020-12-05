'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = exports.taskToPromise = exports.promiseToTask = exports.eitherToTask = exports.toList = exports.fold = exports.foldMap = exports.traverse = exports.of = exports.sequenceA = exports.mconcat = exports.mjoin = exports.ParseError = undefined;

var _ramda = require('ramda');

var _data = require('data.either');

var _data2 = _interopRequireDefault(_data);

var _data3 = require('data.task');

var _data4 = _interopRequireDefault(_data3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ParseError = exports.ParseError = function (_Error) {
  _inherits(ParseError, _Error);

  function ParseError() {
    _classCallCheck(this, ParseError);

    return _possibleConstructorReturn(this, (ParseError.__proto__ || Object.getPrototypeOf(ParseError)).apply(this, arguments));
  }

  return ParseError;
}(Error);

var id = function id(x) {
  return x;
};

var _groupsOf = (0, _ramda.curry)(function (n, xs) {
  return !xs.length ? [] : [xs.slice(0, n)].concat(_groupsOf(n, xs.slice(n, length)));
});

var mjoin = exports.mjoin = function mjoin(mmv) {
  if (mmv.mjoin) return mmv.mjoin();
  return (0, _ramda.chain)(id, mmv);
};

var mconcat = exports.mconcat = (0, _ramda.curry)(function (xs, empty) {
  return xs.length ? xs.reduce(_ramda.concat) : empty();
});

var sequenceA = exports.sequenceA = (0, _ramda.curry)(function (point, fctr) {
  return fctr.traverse(id, point);
});

var of = exports.of = function of(x) {
  return x.of;
};

var traverse = exports.traverse = (0, _ramda.curry)(function (f, point, fctr) {
  return (0, _ramda.compose)(sequenceA(point), (0, _ramda.map)(f))(fctr);
});

var foldMap = exports.foldMap = (0, _ramda.curry)(function (f, fldable) {
  return fldable.reduce(function (acc, x) {
    var r = f(x);
    acc = acc || r.empty();
    return acc.concat(r);
  }, null);
});

var fold = exports.fold = (0, _ramda.curry)(function (f, g, x) {
  return x.fold(f, g);
});

var toList = exports.toList = function toList(x) {
  return x.reduce(function (acc, y) {
    return [y].concat(acc);
  }, []);
};

var eitherToTask = exports.eitherToTask = function eitherToTask(x) {
  return x.cata({
    Left: function Left(e) {
      return _data4.default.rejected(new ParseError(e));
    },
    Right: function Right(x) {
      return _data4.default.of(x);
    }
  });
};

var promiseToTask = exports.promiseToTask = function promiseToTask(p) {
  return new _data4.default(function (rej, res) {
    return p.then(res, rej);
  });
};
var taskToPromise = exports.taskToPromise = function taskToPromise(t) {
  return new Promise(function (res, rej) {
    return t.fork(rej, res);
  });
};

var parse = exports.parse = _data2.default.try((0, _ramda.compose)(JSON.parse, (0, _ramda.prop)('response')));
//# sourceMappingURL=pointfree.js.map