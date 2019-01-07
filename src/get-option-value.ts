import kebabCase = require('lodash.kebabcase');
import { TypeName, Value, Option, RawNamedArgs } from './types';
import { UsageError } from './util';

function convertToNumber(rawValue: string) {
  let value: number;
  if (rawValue.length === 0) {
    value = NaN;
  } else {
    value = Number(rawValue);
  }
  if (isNaN(value)) {
    throw new UsageError(`Could not convert "${rawValue}" to a number`);
  }
  return value;
}

export function getOptionValue(
  optionName: string,
  option: Option<TypeName>,
  rawNamedArgs: RawNamedArgs,
) {
  let value: Value<TypeName>;
  const kebabCasedOptionName = kebabCase(optionName);
  const rawValues = rawNamedArgs[kebabCasedOptionName];
  if (!rawValues) {
    // option was NOT provided as command-line argument
    if (typeof option.defaultValue === 'undefined') {
      throw new UsageError(`option "${kebabCasedOptionName}" is required`);
    }
    value = option.defaultValue;
  } else {
    // option WAS provided as command-line argument
    switch (option.typeName) {
      case 'number':
        if (rawValues.length !== 1) {
          throw new UsageError(
            `Expected option "${kebabCasedOptionName}" to be a single number`,
          );
        }
        value = convertToNumber(rawValues[0]);
        break;
      case 'boolean':
        if (rawValues.length !== 0) {
          throw new UsageError(
            `Boolean options have default "false" and can be set to true as simply "--${kebabCasedOptionName}"`,
          );
        }
        value = true;
        break;
      case 'string':
        if (rawValues.length !== 1) {
          throw new UsageError(
            `Expected option "${kebabCasedOptionName}" to be a single string`,
          );
        }
        value = rawValues[0];
        break;
      case 'string[]':
        if (rawValues.length === 0) {
          throw new UsageError(
            `Expected option "${kebabCasedOptionName}" to be one or more strings`,
          );
        }
        value = [...rawValues];
        break;

      case 'number[]':
        if (rawValues.length === 0) {
          throw new UsageError(
            `Expected option "${kebabCasedOptionName}" to be one or more numbers`,
          );
        }
        value = [...rawValues].map(convertToNumber);
        break;

      default:
        throw new Error(
          `Option "${kebabCasedOptionName}" has invalid type "${option.typeName}"`,
        );
    }
  }
  return value;
}
