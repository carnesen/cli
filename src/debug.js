'use strict';

const debugModule = require('debug');

module.exports = function debug(...args) {
  return debugModule('carnesen:cli')(...args);
};
