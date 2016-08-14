'use strict';

const {
  isDefined,
  throwIfDefined,
  throwIfNot,
  throwIfNotBoolean,
  throwIfNotObject,
  throwIfNotString,
} = require('@carnesen/util');

module.exports = function validateParameter(parameter) {

  throwIfNotObject(parameter, 'parameter');

  const validProperties = [
    'name',
    'description',
    'type',
    'positional',
    'defaultValue'
  ];

  const { name, description, type, positional, defaultValue } = parameter;

  Object.keys(parameter).forEach(property =>
    throwIfNot(validProperties.includes(property), `Unknown parameter property ${ property }`)
  );

  if (isDefined(positional)) {
    throwIfNotBoolean(positional, 'positional');
    if (positional) {
      throwIfDefined(defaultValue, 'defaultValue');
    }
  }

  throwIfNotString(name, 'name');
  throwIfNotString(description, 'description');
  throwIfNotString(type, 'type');

};
