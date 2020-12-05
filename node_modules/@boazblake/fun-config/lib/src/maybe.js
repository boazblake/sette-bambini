'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Maybe = undefined;

var _data = require('data.maybe');

var _data2 = _interopRequireDefault(_data);

var _data3 = require('data.task');

var _data4 = _interopRequireDefault(_data3);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configure = function configure(_) {
  var _toTask = function _toTask(nothing) {
    var cata = {
      Nothing: function Nothing(_) {
        return _data4.default.of(nothing);
      },
      Just: function Just(x) {
        return _data4.default.of(x);
      }
    };
    return this.cata(cata);
  };

  Object.defineProperty(_data2.default.prototype, 'toTask', (0, _util.value)(_toTask));
};
var Maybe = exports.Maybe = { configure: configure };
//# sourceMappingURL=maybe.js.map