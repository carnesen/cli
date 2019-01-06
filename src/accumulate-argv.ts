import camelCase = require('lodash.camelcase');
import { AccumulatedArgv } from './types';

export function accumulateArgv(argv: string[]) {
  const accumulatedArgv: AccumulatedArgv = {
    maybeCommandNames: [],
    rawNamedArgs: {},
  };
  let accumulator = accumulatedArgv.maybeCommandNames;
  for (const arg of argv) {
    const rawValue = arg.trim();
    const matches = rawValue.match(/^--(.*)/);
    if (matches) {
      const parameterName = camelCase(matches[1].trim());
      const existingOption = accumulatedArgv.rawNamedArgs[parameterName];
      if (existingOption) {
        throw new Error('Each parameter can be provided at most one time');
      } else {
        accumulator = [];
        accumulatedArgv.rawNamedArgs[parameterName] = accumulator;
      }
    } else {
      accumulator.push(rawValue);
    }
  }
  return accumulatedArgv;
}
