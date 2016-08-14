'use strict';

const {
  throwIf,
  throwIfNot,
  throwIfNotArray,
  throwIfNotFunction,
  throwIfNotObject,
  throwIfNotString,
} = require('@carnesen/util');

const validateParameter = require('./validateParameter');

module.exports = function validateCommand(command) {

  throwIfNotObject(command);

  const validProperties = [
    'name',
    'description',
    'parameters',
    'commands',
    'execute'
  ];

  const {
    name,
    description,
    parameters = [],
    commands,
    execute
  } = command;

  Object.keys(command).forEach(property =>
    throwIfNot(validProperties.includes(property), `Unknown command property ${ property }`)
  );

  throwIfNotString(name, 'name');
  throwIfNotString(description, 'description');
  throwIfNotArray(parameters);
  parameters.forEach(validateParameter);
  throwIfNot(execute || commands, 'Expected to find "execute" or "commands"');
  throwIf(execute && commands, 'Expected to find "execute" or "commands" but not both');

  if (execute) {
    throwIfNotFunction(execute, 'execute');
  } else {
    throwIfNotArray(commands);
    commands.forEach(validateCommand);
  }

};
