import { NamedArgs, Command, Options, RawNamedArgs } from './types';
import { getOptionValue } from './get-value';
import { usage } from './usage';

export function createSteps(commands: Command<Options>[], rawNamedArgs: RawNamedArgs) {
  const lastCommand = commands.slice(-1)[0];
  if (lastCommand.subcommands && lastCommand.subcommands.length > 0) {
    throw usage(commands, 'Too few arguments');
  }

  const steps: (() => Promise<any>)[] = [];
  for (const command of commands) {
    const { execute, options } = command;
    if (execute) {
      const namedArgs: NamedArgs<Options> = {};
      for (const [optionName, option] of Object.entries(options)) {
        const rawValues = rawNamedArgs[optionName];
        if (!rawValues) {
          // option was NOT provided as command-line argument
          if (typeof option.defaultValue === 'undefined') {
            throw `option "${optionName}" is required`;
          }
          namedArgs[optionName] = option.defaultValue;
        } else {
          // option WAS provided as command-line argument
          namedArgs[optionName] = getOptionValue(optionName, option.typeName, rawValues);
        }
      }
      steps.push(() => execute(namedArgs));
    }
  }
  return steps;
}
