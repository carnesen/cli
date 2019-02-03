import { TypeName, Value, Option, RawNamedArgs } from './types';
import { UsageError } from './usage-error';

function convertToNumber(rawValue: string) {
  let value: number = NaN;
  if (rawValue.length > 0) {
    value = Number(rawValue);
  }
  if (isNaN(value)) {
    throw new UsageError(`Could not convert "${rawValue}" to a number`);
  }
  return value;
}

export function getOptionDefaultValue(
  option: Pick<Option<TypeName, boolean>, 'typeName' | 'defaultValue'>,
) {
  const defaultValue = option.typeName === 'boolean' ? false : option.defaultValue;
  return defaultValue;
}

export function getOptionValue(
  optionName: string,
  option: Option<TypeName, boolean>,
  rawValues: RawNamedArgs[string],
) {
  let value: Value<TypeName> | null;
  if (!rawValues) {
    // option was NOT provided as command-line argument
    const defaultValue = getOptionDefaultValue(option);
    if (typeof defaultValue !== 'undefined') {
      value = defaultValue;
    } else {
      if (option.nullable !== true) {
        throw new UsageError(`Option "${optionName}" is required`);
      }
      value = null;
    }
  } else {
    // option WAS provided as command-line argument
    switch (option.typeName) {
      case 'number':
        if (rawValues.length !== 1) {
          throw new UsageError(`Expected option "${optionName}" to be a single number`);
        }
        value = convertToNumber(rawValues[0]);
        break;
      case 'boolean':
        if (rawValues.length !== 0) {
          throw new UsageError(
            `Boolean options have default "false" and can be set to true as simply "--${optionName}"`,
          );
        }
        value = true;
        break;
      case 'string':
        if (rawValues.length !== 1) {
          throw new UsageError(`Expected option "${optionName}" to be a single string`);
        }
        value = rawValues[0];
        break;
      case 'string[]':
        if (rawValues.length === 0) {
          throw new UsageError(
            `Expected option "${optionName}" to be one or more strings`,
          );
        }
        value = [...rawValues];
        break;
      case 'number[]':
        if (rawValues.length === 0) {
          throw new UsageError(
            `Expected option "${optionName}" to be one or more numbers`,
          );
        }
        value = [...rawValues].map(convertToNumber);
        break;
      case 'json':
        if (rawValues.length !== 1) {
          throw new UsageError(`Expected option "${optionName}" to be a json string`);
        }
        try {
          value = JSON.parse(rawValues[0]);
        } catch (ex) {
          throw new UsageError(`Failed to parse json ${rawValues[0]}`);
        }
        break;
      default:
        throw new Error(`Option "${optionName}" has invalid type "${option.typeName}"`);
    }
  }
  if (Array.isArray(option.allowedValues)) {
    const allAllowedValues: (string | number | null)[] = [...option.allowedValues];
    if (typeof option.defaultValue !== 'undefined') {
      allAllowedValues.push(option.defaultValue);
    }
    if (option.nullable === true) {
      allAllowedValues.push(null);
    }
    if (!(allAllowedValues.includes as any)(value)) {
      throw new UsageError(`Value "${value}" is not allowed for option "${optionName}"`);
    }
  }
  return value;
}
