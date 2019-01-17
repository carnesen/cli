import { Option, TypeName } from './types';
import { getOptionDefaultValue } from './get-option-value';
import redent = require('redent');

const singleQuote = (str: string) => `'${str}'`;

function convertDefaultValueToString(defaultValue: any) {
  if (typeof defaultValue === 'undefined' || defaultValue === false) {
    return '';
  }
  return `(Default = ${
    Array.isArray(defaultValue)
      ? defaultValue.join(' ')
      : typeof defaultValue === 'string'
      ? singleQuote(defaultValue)
      : typeof defaultValue === 'object'
      ? singleQuote(JSON.stringify(defaultValue))
      : defaultValue
  })`;
}

export function getOptionString(optionName: string, option: Option<TypeName>) {
  const { typeName, description } = option;
  const descriptionLines = description
    ? redent(description.replace(/^\n/g, ''), 0).split('\n')
    : [];
  let optionUsage = `--${optionName}`;
  switch (typeName) {
    case 'boolean':
      // booleans are false by default, set to true as simply "--optionName"
      break;
    case 'string':
      optionUsage += ' <str>';
      break;
    case 'number':
      optionUsage += ' <num>';
      break;
    case 'string[]':
      optionUsage += ' <str0> [<str1> ...]';
      break;
    case 'number[]':
      optionUsage += ' <num0> [<num1> ...]';
      break;
    case 'json':
      optionUsage += ' <json>';
      break;
    default:
      // In this code block `typeName` should have type `never`.
      throw new Error(`Unexpected option type "${typeName}"`);
  }
  const defaultValueString = convertDefaultValueToString(getOptionDefaultValue(option));
  if (defaultValueString) {
    descriptionLines.unshift(defaultValueString);
  }
  let firstLine = optionUsage;
  const restLines: string[] = [];
  let index = 0;
  for (const descriptionLine of descriptionLines) {
    if (index === 0) {
      firstLine += ` : ${descriptionLine}`;
    } else {
      restLines.push(redent(descriptionLine, optionUsage.length + 3));
    }
    index = index + 1;
  }
  return [firstLine, ...restLines].join('\n');
}
