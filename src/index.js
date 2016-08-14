'use strict';

const parseArgs = require('minimist');

const debug = require('./debug');
const run = require('./run');
const validateCommand = require('./validateCommand');

module.exports = function cli(command) {

  debug('validateCommand');
  validateCommand(command);

  command.args = process.argv.slice(2);
  command.path = [];
  command.parameters = command.parameters || [];

  debug('parseArgs', command.args);
  const parsed = parseArgs(command.args);

  run(command, parsed);

};
