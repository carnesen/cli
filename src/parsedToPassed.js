'use strict';

const { isDefined, isUndefined } = require('@carnesen/util');

const debug = require('./debug');
const usage = require('./usage');

module.exports = function parsedToPassed(command, parsed) {

  debug('parsedToPassed');

  const { parameters } = command;

  // parsed = { _: [], foo: 'bar' }

  const passed = {};

  parameters.forEach(parameter => {

    const { name, positional, defaultValue } = parameter;

    if (positional) {
      // positional parameter
      const value = parsed._.shift();
      if (isUndefined(value)) {
        usage(command, true);
      } else {
        passed[name] = value;
      }
    } else {
      // named parameter
      let value = parsed[name];
      if (isDefined(value)) {
        passed[name] = value;
      } else {
        if (isDefined(defaultValue)) {
          passed[name] = defaultValue;
        } else {
          usage(command, true);
        }
      }
    }

  });

  return passed;

};
