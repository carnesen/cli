'use strict';

const ini = require('ini');

const show = require('./show');

module.exports = function get() {
  return show().then(ini.parse);
};
