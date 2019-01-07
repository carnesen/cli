import { AccumulatedArgv } from './types';
import { UsageError } from './util';

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
      const kebabCasedOptionName = matches[1].trim();
      const existingOption = accumulatedArgv.rawNamedArgs[kebabCasedOptionName];
      if (existingOption) {
        throw new UsageError('Each option can be provided at most one time');
      } else {
        accumulator = [];
        accumulatedArgv.rawNamedArgs[kebabCasedOptionName] = accumulator;
      }
    } else {
      accumulator.push(rawValue);
    }
  }
  return accumulatedArgv;
}
