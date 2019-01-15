import { Option, TypeName } from './types';
import { getOptionDefaultValue } from './get-option-value';
import redent = require('redent');

export function getOptionString(optionName: string, option: Option<TypeName>) {
  const { typeName, description } = option;
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
    default:
      // In this code block `typeName` should have type `never`.
      throw new Error(`Unexpected option type "${typeName}"`);
  }
  let descriptionWithDefaultString = !description
    ? ''
    : description
        .split('\n')
        .map((lineIn, index) => {
          if (index === 0) {
            return `${optionUsage} : ${lineIn.trim()}`;
          }
          return redent(lineIn, optionUsage.length + 3);
        })
        .join('\n');
  const defaultValue = getOptionDefaultValue(option);
  if (typeof defaultValue !== 'undefined' && defaultValue !== false) {
    descriptionWithDefaultString += redent(
      `\n(Default: ${
        Array.isArray(defaultValue) ? defaultValue.join(' ') : defaultValue
      })`,
      optionUsage.length + 3,
    );
  }
  return descriptionWithDefaultString;
}
