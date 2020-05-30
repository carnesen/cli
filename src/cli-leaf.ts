import {
  AnyNamedArgParsers,
  ICliLeaf,
  AnyArgParser,
  CliArgParser,
  CliLeafOptions,
} from './types';
import { CLI_LEAF } from './constants';

/**
 *
 * A factory for creating "action" commands
 * @param options
 * @returns The newly-created `leaf`.
 */

export function CliLeaf<
  TPositional extends AnyArgParser = CliArgParser<undefined, false>,
  TNamed extends AnyNamedArgParsers = any,
  TEscaped extends AnyArgParser = CliArgParser<undefined, false>
>(
  options: CliLeafOptions<TPositional, TNamed, TEscaped>,
): ICliLeaf<TPositional, TNamed, TEscaped> {
  return {
    ...options,
    commandType: CLI_LEAF,
  };
}
