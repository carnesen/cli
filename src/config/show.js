'use strict';

const { util } = require('bitcoin-rpc');

const { configFile } = require('./constants');

function show() {
  return util.readFile(configFile, { encoding: 'utf8' })
    .catch(err => {
      if (err.code !== 'ENOENT') {
        throw err;
      }
      return '';
    });
}

show.usage = [
  '%usage',
  '%indent %exe %command show'
];

module.exports = show;
