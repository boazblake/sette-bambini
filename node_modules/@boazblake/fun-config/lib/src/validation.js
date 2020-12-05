'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Validation = undefined;

var _data = require('data.validation');

var _data2 = _interopRequireDefault(_data);

var _data3 = require('data.task');

var _data4 = _interopRequireDefault(_data3);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var constant = function constant(x) {
  return function () {
    return x;
  };
};

var id = function id(x) {
  return x;
};

var configure = function configure() {
  var apLeft = function apLeft(b) {
    return this.map(constant).ap(b);
  };

  Object.defineProperty(_data2.default.prototype, 'apLeft', (0, _util.value)(apLeft));

  var apRight = function apRight(b) {
    return this.map(constant(id)).ap(b);
  };

  Object.defineProperty(_data2.default.prototype, 'apRight', (0, _util.value)(apRight));

  var _toTask = function _toTask() {
    var f = {
      Failure: function Failure(x) {
        return _data4.default.rejected(x);
      },
      Success: function Success(x) {
        return _data4.default.of(x);
      }
    };

    return this.cata(f);
  };

  Object.defineProperty(_data2.default.prototype, 'toTask', (0, _util.value)(_toTask));
};

var Validation = exports.Validation = { configure: configure };
//# sourceMappingURL=validation.js.map