import { Option, TypeName } from './types';
import { getOptionDefaultValue } from './get-option-value';

export function getOptionString(optionName: string, option: Option<TypeName>) {
  const { typeName, description } = option;
  let optionString = `--${optionName}`;
  switch (typeName) {
    case 'boolean':
      // booleans are false by default, set to true as simply "--optionName"
      break;
    case 'string':
      optionString += ' <str>';
      break;
    case 'number':
      optionString += ' <num>';
      break;
    case 'string[]':
      optionString += ' <str0> [<str1> ...]';
      break;
    case 'number[]':
      optionString += ' <num0> [<num1> ...]';
      break;
    default:
      // In this code block `typeName` should have type `never`.
      throw new Error(`Unexpected option type "${typeName}"`);
  }
  let descriptionWithDefaultString = description ? description : '';
  const defaultValue = getOptionDefaultValue(option);
  if (typeof defaultValue !== 'undefined' && defaultValue !== false) {
    descriptionWithDefaultString += ` (default: ${
      Array.isArray(defaultValue) ? defaultValue.join(' ') : defaultValue
    })`;
  }
  if (descriptionWithDefaultString) {
    optionString += ` : ${descriptionWithDefaultString}`;
  }

  return optionString;
}
