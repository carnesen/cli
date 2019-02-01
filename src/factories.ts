import { runAndExit } from '@carnesen/run-and-exit';

import { TypeName, Option, Options, Leaf, Branch } from './types';
import { assembleCli } from './assemble-cli';
import { LEAF, BRANCH } from './constants';

export const option = <T extends TypeName, U extends boolean>(opt: Option<T, U>) => opt;

// The "commandType" field is assigned internally by the framework
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

export const cli = (root: Branch | Leaf<any>) => {
  const assembled = assembleCli(root);
  return (argv = process.argv.slice(2)) => {
    runAndExit(assembled, argv);
  };
};

export const testCli = (root: Branch | Leaf<any>) => {
  const assembled = assembleCli(root);
  return (str?: string) => {
    const argv = str ? str.split(' ') : [];
    return assembled(argv);
  };
};

export const testCliThrows = (root: Branch | Leaf<any>) => {
  const assembled = assembleCli(root);
  return async (str?: string) => {
    try {
      const argv = str ? str.split(' ') : [];
      await assembled(argv);
      throw Symbol('This line is never meant to be reached');
    } catch (ex) {
      return ex;
    }
  };
};
