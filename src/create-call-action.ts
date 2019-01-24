import { NamedArgs, Options, RawNamedArgs, Command, Validate, TypeName } from './types';
import { getOptionValue } from './get-option-value';
import { UsageError } from './usage-error';
import { LEAF } from './constants';

type CallValidate = () => ReturnType<Validate<TypeName>>;

export function createCallAction(commandStack: Command[], rawNamedArgs: RawNamedArgs) {
  const command = commandStack.slice(-1)[0];
  if (command.commandType !== LEAF) {
    // At this point we've processed all "command name" args,
    // but we still have not ended with a "leaf" command.
    throw new UsageError();
  }
  const { action, options } = command;
  const namedArgs: NamedArgs<Options> = {};
  const restRawNamedArgs = { ...rawNamedArgs };
  const callValidates: CallValidate[] = [];
  if (options) {
    for (const [optionName, option] of Object.entries(options)) {
      const rawValues = restRawNamedArgs[optionName];
      delete restRawNamedArgs[optionName];
      const optionValue = getOptionValue(optionName, option, rawValues);
      namedArgs[optionName] = optionValue;
      if (typeof option.validate === 'function') {
        callValidates.push(() => option.validate!(optionValue));
      }
    }
  }
  const restOptionNames = Object.keys(restRawNamedArgs);
  if (restOptionNames.length > 0) {
    throw new UsageError(`Unknown option "--${restOptionNames[0]}"`);
  }
  return async function callAction() {
    for (const callValidate of callValidates) {
      const message = await callValidate();
      if (message) {
        throw new UsageError(message);
      }
    }
    return action(namedArgs);
  };
}
