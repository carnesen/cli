import { Option, Options, Command, TypeName } from './types';
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
      valuePlaceholder = '<string0> [<string1> ...]';
      break;
    case 'string':
      valuePlaceholder = '<string>';
      break;
    case 'number':
      valuePlaceholder = '<number>';
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
  return `--${optionName} ${valuePlaceholder} : ${description} ${defaultValueString}`;
}

function indent(strings: string[]) {
  return strings.map(string => `   ${string}`).join('\n');
}

function getCommandName(arg: { commandName: string }) {
  return arg.commandName;
}

function getOptions(commands: Command<Options>[]) {
  let options: Options = {};
  for (const command of commands) {
    if (command.options) {
      options = { ...options, ...command.options };
    }
  }
  return options;
}

export function usage(commands: Command<Options>[], errorMessage?: string) {
  const lastCommand = commands.slice(-1)[0];
  const { subcommands = [], description } = lastCommand;

  const paragraphs: string[] = [];
  function push(...p: string[]) {
    paragraphs.push(...p);
  }

  if (errorMessage) {
    push(`Error: ${errorMessage}`);
  }
  const subcommandString = subcommands.length > 0 ? `${SUBCOMMAND}` : '';
  const commandNamesString = commands.map(command => command.commandName).join(' ');

  push(`Usage: ${commandNamesString} ${subcommandString}${OPTIONS}`);

  push(description);

  let whereOrAnd;
  if (subcommands.length > 0) {
    push(`Where ${SUBCOMMAND} is one of`);
    push(indent(subcommands.map(getCommandName)));
    whereOrAnd = 'and';
  } else {
    whereOrAnd = 'Where';
  }

  const options = getOptions(commands);
  const pairs = Object.entries(options);
  if (pairs.length > 0) {
    push(`${whereOrAnd} ${OPTIONS} include`);
    push(indent(pairs.map(pair => toOptionString(...pair))));
  }

  return `\n${paragraphs.join('\n\n')}\n`;
}
