import { NamedArgs, Command, Options, RawNamedArgs, Step } from './types';
import { getOptionValue } from './get-option-value';
import { UsageError } from './usage-error';

export function accumulateSteps(
  commandStack: Command<Options>[],
  rawNamedArgs: RawNamedArgs,
) {
  const lastCommand = commandStack.slice(-1)[0];
  if (lastCommand.subcommands && lastCommand.subcommands.length > 0) {
    throw new UsageError();
  }
  const steps: Step[] = [];
  for (const command of commandStack) {
    const { action, options } = command;
    if (action) {
      const namedArgs: NamedArgs<Options> = {};
      if (options) {
        for (const [optionName, option] of Object.entries(options)) {
          namedArgs[optionName] = getOptionValue(optionName, option, rawNamedArgs);
        }
      }
      steps.push(() => action(namedArgs));
    }
  }
  return steps;
}
