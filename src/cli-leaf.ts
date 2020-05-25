/* eslint-disable no-redeclare */
import {
  AnyNamedArgParsers,
  CliLeaf,
  ExcludeCommandType,
  AnyArgParser,
  CliArgParser,
} from './types';
import { CLI_LEAF } from './constants';

export function CliLeaf<
  TPositional extends AnyArgParser = CliArgParser<undefined, false>,
  TNamed extends AnyNamedArgParsers = any,
  TEscaped extends AnyArgParser = CliArgParser<undefined, false>
>(
  config: ExcludeCommandType<CliLeaf<TPositional, TNamed, TEscaped>>,
): CliLeaf<TPositional, TNamed, TEscaped> {
  const cliLeaf: CliLeaf<TPositional, TNamed, TEscaped> = {
    ...config,
    commandType: CLI_LEAF,
  };
  return cliLeaf;
}
