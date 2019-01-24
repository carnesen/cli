import { UsageError } from './usage-error';
import { RawNamedArgs } from './types';

export type AccumulatedArgv = {
  maybeCommandNames: string[];
  rawNamedArgs: RawNamedArgs;
  foundHelpArg: boolean;
};

export function accumulateArgv(argv: string[]) {
  const accumulatedArgv: AccumulatedArgv = {
    maybeCommandNames: [],
    rawNamedArgs: {},
    foundHelpArg: false,
  };
  let accumulator = accumulatedArgv.maybeCommandNames;
  for (const arg of argv) {
    if (['-h', '--help', '-help'].includes(arg)) {
      accumulatedArgv.foundHelpArg = true;
      continue;
    }
    const rawValue = arg.trim();
    const matches = rawValue.match(/^--(.*)/);
    if (matches) {
      const optionName = matches[1].trim();
      const existingOption = accumulatedArgv.rawNamedArgs[optionName];
      if (existingOption) {
        throw new UsageError(`Option "${optionName}" was provided twice`);
      } else {
        accumulator = [];
        accumulatedArgv.rawNamedArgs[optionName] = accumulator;
      }
    } else {
      accumulator.push(rawValue);
    }
  }
  return accumulatedArgv;
}
