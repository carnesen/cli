'use strict';

const co = require('co');

const validatePassed = require('./validatePassed');

module.exports = function makeExecute(commandNames, commands, fail) {

  function execute(passed) {

    const commandName = passed._[0];
    passed._.slice(0, 1);
    commandNames.push(commandName);

    const command = commands.find(command => command.name === commandName);

    if (command.execute) {
      validatePassed(command.execute, passed);
      return co(command.execute(passed));
    } else {
      validatePassed(execute, passed);
      return makeExecute(commandNames, commands, fail)(passed);
    }

  }

  execute.positionalOptions = [{
    name: 'subcommand',
    type: 'string',
    description: `one of ${ commands.map(command => command.name).join(', ') }`
  }];

  return execute;

};


