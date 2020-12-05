'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Task = undefined;

var _data = require('data.task');

var _data2 = _interopRequireDefault(_data);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configure = function configure() {
  var _mjoin = function _mjoin() {
    var _this = this;

    return new _data2.default(function (rej, res) {
      return _this.fork(rej, function (s) {
        return s.fork(rej, res);
      });
    });
  };

  Object.defineProperty(_data2.default.prototype, 'mjoin', (0, _util.value)(_mjoin));
};

var Task = exports.Task = { configure: configure };
//# sourceMappingURL=task.js.map