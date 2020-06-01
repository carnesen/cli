import { CLI_LEAF } from './constants';
import {
  AnyArgParser,
  AnyNamedArgParsers,
  ValueFromArgParser,
  NamedValues,
  ICliArgParser,
} from './cli-arg-parser';

export type CliLeafOptions<
  TPositionalArgParser extends AnyArgParser,
  TNamedArgParsers extends AnyNamedArgParsers,
  TEscapedArgParser extends AnyArgParser
> = {
  /**
   * An action word that describes what this leaf does. Used for navigation e.g. "list" in
   * `cloud users list`.
   */
  name: string;
  /**
   * The function that defines your command logic.
   *
   * @param positionalValue
   * @param namedValues
   * @param escapedValue
   * @returns A value (synchronously) or a `Promise` that resolves to a value
   * @remarks
   * By default, {@linkcode runCliAndExit} `console.log`s the value returned by `action`.
   * The type of the `args` argument received by `action` is derived by the `args`
   * property of the leaf. Similarly, the `options` argument type is derived from
   * `leaf.options`.
   *
   */
  action: (
    positionalValue: ValueFromArgParser<TPositionalArgParser>,
    namedValues: NamedValues<TNamedArgParsers>,
    escapedValue: ValueFromArgParser<TEscapedArgParser>,
  ) => any;
  positionalArgParser?: TPositionalArgParser;
  namedArgParsers?: TNamedArgParsers;
  escapedArgParser?: TEscapedArgParser;
  /**
   * A string that will be included in `Usage:` if present.
   */
  description?: string;
  /**
   * If true, don't show this leaf in usage docs.
   */
  hidden?: boolean;
};

/**
 * Interface describing a "leaf" command
 * @typeParam TPositionalArgParser Type of the "positional" arguments parser
 * @typeParam TNamedArgParsers Type of the ""
 */
export interface ICliLeaf<
  TPositionalArgParser extends AnyArgParser,
  TNamedArgParsers extends AnyNamedArgParsers,
  TEscapedArgParser extends AnyArgParser
> extends CliLeafOptions<TPositionalArgParser, TNamedArgParsers, TEscapedArgParser> {
  commandType: typeof CLI_LEAF;
}

/**
 *
 * A factory function for creating CLI leaf commands
 * @param options
 * @returns The newly-created `leaf`.
 */
export function CliLeaf<
  TPositional extends AnyArgParser = ICliArgParser<undefined, false>,
  TNamed extends AnyNamedArgParsers = any,
  TEscaped extends AnyArgParser = ICliArgParser<undefined, false>
>(
  options: CliLeafOptions<TPositional, TNamed, TEscaped>,
): ICliLeaf<TPositional, TNamed, TEscaped> {
  return {
    ...options,
    commandType: CLI_LEAF,
  };
}
