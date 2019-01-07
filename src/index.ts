import { runAndExit } from '@carnesen/run-and-exit';

import { TypeName, Option, Options, Command } from './types';
import { buildCli } from './build-cli';

export const option = <T extends TypeName>(opt: Option<T>) => opt;

export const command = <O extends Options>(cmd: Command<O>) => cmd;

export const cli = (rootCommand: Command<any>, argv = process.argv.slice(2)) => {
  const asyncFunc = buildCli(rootCommand);
  runAndExit(asyncFunc, argv);
};
