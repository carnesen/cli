'use strict';

const set = require('./set');
const show = require('./show');

module.exports = [
  '%usage',
  show.usage[1],
  set.usage[1]
];
