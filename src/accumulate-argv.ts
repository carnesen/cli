import { UsageError } from './usage-error';
import { RawNamedArgs } from './types';

export type AccumulatedArgv = {
  maybeCommandNames: string[];
  rawNamedArgs: RawNamedArgs;
  foundHelpArg: boolean;
  foundVersionArg: boolean;
};

export function accumulateArgv(argv: string[]) {
  const returnValue: AccumulatedArgv = {
    maybeCommandNames: [],
    rawNamedArgs: {},
    foundHelpArg: false,
    foundVersionArg: false,
  };
  let accumulator = returnValue.maybeCommandNames;
  for (const arg of argv) {
    if (['-h', '--h', '--help', '-help'].includes(arg)) {
      returnValue.foundHelpArg = true;
      continue;
    }
    if (['-v', '--v', '--version', '-version'].includes(arg)) {
      returnValue.foundVersionArg = true;
      break;
    }
    const rawValue = arg.trim();
    const matches = rawValue.match(/^--(.*)/);
    if (matches) {
      const optionName = matches[1].trim();
      const existingOption = returnValue.rawNamedArgs[optionName];
      if (existingOption) {
        throw new UsageError(`Option "${optionName}" was provided twice`);
      } else {
        accumulator = [];
        returnValue.rawNamedArgs[optionName] = accumulator;
      }
    } else {
      if (accumulator === returnValue.maybeCommandNames && rawValue === 'help') {
        returnValue.foundHelpArg = true;
      } else {
        accumulator.push(rawValue);
      }
    }
  }
  return returnValue;
}
