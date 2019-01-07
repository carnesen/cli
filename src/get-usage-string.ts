import redent = require('redent');
import kebabCase = require('lodash.kebabcase');

import { Option, Options, TypeName, CommandStack } from './types';

const OPTIONS = '<options>';
const SUBCOMMAND = '<subcommand>';

function toOptionString(optionName: string, option: Option<TypeName>) {
  const { typeName, defaultValue, description } = option;
  let valuePlaceholder;
  switch (typeName) {
    case 'boolean':
      valuePlaceholder = '';
      break;
    case 'string[]':
      valuePlaceholder = '<str0> [<str1> ...]';
      break;
    case 'string':
      valuePlaceholder = '<str>';
      break;
    case 'number':
      valuePlaceholder = '<num>';
      break;
    case 'number[]':
      valuePlaceholder = '<num0> [<num1> ...]';
      break;
    default:
      throw new Error(`Unexpected option type "${typeName}"`);
  }
  const defaultValueString =
    typeof defaultValue !== 'undefined'
      ? `(default: ${
          Array.isArray(defaultValue) ? defaultValue.join(' ') : defaultValue
        })`
      : '';
  const kebabCasedOptionName = kebabCase(optionName);
  return `--${kebabCasedOptionName} ${valuePlaceholder} : ${description} ${defaultValueString}`;
}

function indent(strings: string[]) {
  return redent(strings.join('\n'), 3);
}

function getOptions(commandStack: CommandStack) {
  let options: Options = {};
  for (const command of commandStack) {
    if (command.options) {
      options = { ...options, ...command.options };
    }
  }
  return options;
}

export function getUsageString(commandStack: CommandStack, errorMessage?: string) {
  const lastCommand = commandStack.slice(-1)[0];
  const { subcommands = [], description } = lastCommand;

  const paragraphs: string[] = [];
  function pushParagraph(...p: string[]) {
    paragraphs.push(...p);
  }

  if (errorMessage) {
    pushParagraph(`Error: ${errorMessage}`);
  }
  const subcommandString = subcommands.length > 0 ? `${SUBCOMMAND} ` : '';
  const commandNamesString = commandStack.map(command => command.commandName).join(' ');

  pushParagraph(`Usage: ${commandNamesString} ${subcommandString}${OPTIONS}`);

  if (description) {
    pushParagraph(redent(description, 3).replace(/^\n/, ''));
  }

  if (subcommands.length > 0) {
    pushParagraph('Subcommands:');
    pushParagraph(indent([subcommands.map(command => command.commandName).join(', ')]));
  }

  const options = getOptions(commandStack);
  const pairs = Object.entries(options);
  if (pairs.length > 0) {
    pushParagraph('Options:');
    pushParagraph(indent(pairs.map(pair => toOptionString(...pair))));
  }

  return `${paragraphs.join('\n\n')}\n`;
}
