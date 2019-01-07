import { NamedArgs, Command, Options, RawNamedArgs, Step } from './types';
import { getOptionValue } from './get-option-value';
import { UsageError } from './util';

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
    const { execute, options } = command;
    if (execute) {
      const namedArgs: NamedArgs<Options> = {};
      for (const [optionName, option] of Object.entries(options)) {
        namedArgs[optionName] = getOptionValue(optionName, option, rawNamedArgs);
      }
      steps.push(() => execute(namedArgs));
    }
  }
  return steps;
}
