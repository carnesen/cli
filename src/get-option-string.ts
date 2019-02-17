import { Option, TypeName } from './types';
import { getOptionDefaultValue } from './get-option-value';
import redent = require('redent');

const singleQuote = (str: string) => `'${str}'`;
const stripLeadingNewline = (str: string) => str.replace(/^\n/, '');
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
  const descriptionLines = description
    ? redent(stripLeadingNewline(description), 0).split('\n')
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
  if (option.nullable === true || typeof option.defaultValue !== 'undefined') {
    optionUsage = `[${optionUsage}]`;
  }
  if (typeof option.allowedValues !== 'undefined') {
    const allAllowedValues = [...option.allowedValues];
    if (typeof option.defaultValue !== 'undefined') {
      allAllowedValues.unshift(option.defaultValue);
    }
    const allowedValuesString = ([...new Set(allAllowedValues)] as string[])
      .map(maybeStr => {
        return typeof maybeStr === 'string' ? singleQuote(maybeStr) : maybeStr;
      })
      .join(', ');
    descriptionLines.push(`Allowed values {${allowedValuesString}}`);
  }
  const defaultValueString = convertDefaultValueToString(getOptionDefaultValue(option));
  if (defaultValueString) {
    descriptionLines.push(defaultValueString);
  }
  let firstLine = optionUsage;
  const firstDescriptionLine = descriptionLines[0];
  if (firstDescriptionLine) {
    firstLine += ` : ${firstDescriptionLine}`;
  }
  const restDescriptionLines = descriptionLines.slice(1);
  const restLines =
    restDescriptionLines.length > 0
      ? redent(restDescriptionLines.join('\n'), optionUsage.length + 3).split('\n')
      : [];
  return [firstLine, ...restLines].join('\n');
}
