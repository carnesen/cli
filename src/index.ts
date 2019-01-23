import runAndExit = require('@carnesen/run-and-exit');

import { TypeName, Option, Options, Leaf, Branch } from './types';
import { assembleCli } from './assemble-cli';
import { LEAF, BRANCH } from './constants';

export const option = <T extends TypeName>(opt: Option<T>) => opt;

type ExcludeCommandType<T extends { commandType: any }> = Pick<
  T,
  Exclude<keyof T, 'commandType'>
>;

export const leaf = <O extends Options>(cmd: ExcludeCommandType<Leaf<O>>): Leaf<O> => ({
  ...cmd,
  commandType: LEAF,
});

export const branch = (cmd: ExcludeCommandType<Branch>): Branch => ({
  ...cmd,
  commandType: BRANCH,
});

export const cli = (rootCommand: Branch | Leaf<any>, argv = process.argv.slice(2)) => {
  const asyncFunc = assembleCli(rootCommand);
  runAndExit(asyncFunc, argv);
};

export { assembleCli } from './assemble-cli';
export { UsageError } from '@carnesen/usage-error';
