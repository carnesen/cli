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
      ? `[${defaultValue
          .map(item => (typeof item === 'string' ? singleQuote(item) : item))
          .join(', ')}]`
      : typeof defaultValue === 'string'
      ? singleQuote(defaultValue)
      : typeof defaultValue === 'object'
      ? singleQuote(JSON.stringify(defaultValue))
      : defaultValue
  })`;
}

export function getOptionString(optionName: string, option: Option<TypeName, boolean>) {
  const { typeName, description } = option;
  const blocks = description
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
      optionUsage += ' <str0> [...]';
      break;
    case 'number[]':
      optionUsage += ' <num0> [...]';
      break;
    case 'json':
      optionUsage += ' <json>';
      break;
    default:
      // In this code block `typeName` should have type `never`.
      throw new Error(`Option "${optionName}" has unexpected typeName "${typeName}"`);
  }
  if (option.nullable === true) {
    optionUsage = `[${optionUsage}]`;
  }
  if (typeof option.allowedValues !== 'undefined') {
    blocks.push(`Allowed values { ${option.allowedValues.join(', ')} }`);
  }
  const defaultValueString = convertDefaultValueToString(getOptionDefaultValue(option));
  if (defaultValueString) {
    blocks.push(defaultValueString);
  }
  let firstLine = optionUsage;
  const restLines: string[] = [];
  let index = 0;
  for (const descriptionLine of blocks) {
    if (index === 0) {
      firstLine += ` : ${descriptionLine}`;
    } else {
      restLines.push(redent(descriptionLine, optionUsage.length + 3));
    }
    index = index + 1;
  }
  return [firstLine, ...restLines].join('\n');
}
