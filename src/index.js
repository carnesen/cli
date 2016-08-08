'use strict';

const parseArgs = require('minimist');
const util = require('@carnesen/util');

module.exports = function createCli(name, commands) {

  util.throwIfNotString(name, 'name');
  util.throwIfNotArray(commands, 'commands');





  function validate(parameters, options) {
    if (parameters.positional) {

    }
    return parameters.every(parameter => {

    });
  }

  function makeExecute(commandNames, commands) {

    return function execute(passed) {
      const commandName = passed._[0];
      passed._.splice(0, 1);
      const command = commands.find(command => command.name === commandName);
      if (command) {
        if (command.execute) {

          command.execute(passed)
        }
      } else {

      }
    }

  }

};