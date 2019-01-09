import { NamedArgs, Options, RawNamedArgs, Command } from './types';
import { getOptionValue } from './get-option-value';
import { UsageError } from './usage-error';
import { LEAF } from './constants';

export function callAction(commandStack: Command[], rawNamedArgs: RawNamedArgs) {
  const command = commandStack.slice(-1)[0];
  if (command.commandType !== LEAF) {
    // At this point we've processed all "command name" args,
    // but we still have not ended with a "leaf" command.
    throw new UsageError();
  }
  const { action, options } = command;
  const namedArgs: NamedArgs<Options> = {};
  const restRawNamedArgs = { ...rawNamedArgs };
  if (options) {
    for (const [optionName, option] of Object.entries(options)) {
      const rawValues = restRawNamedArgs[optionName];
      delete restRawNamedArgs[optionName];
      namedArgs[optionName] = getOptionValue(optionName, option, rawValues);
    }
  }
  const restOptionNames = Object.keys(restRawNamedArgs);
  if (restOptionNames.length > 0) {
    throw new UsageError(`Unknown option "--${restOptionNames[0]}"`);
  }
  return action(namedArgs);
}
