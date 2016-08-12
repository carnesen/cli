'use strict';

const parseArgs = require('minimist');

const makeExecute = require('./makeExecute');
const makeFail = require('./makeFail');

module.exports = function cli(name, commands) {

  const args = process.argv.slice(2);
  const passed = parseArgs(args);
  const commandNames = [name];

  const fail = makeFail(name, args);

  makeExecute(commandNames, commands, fail)(passed);

};
