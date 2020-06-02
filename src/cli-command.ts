import { CLI_COMMAND } from './constants';
import {
  AnyArgParser,
  AnyNamedArgParsers,
  ValueFromArgParser,
  NamedValues,
  ICliArgParser,
} from './cli-arg-parser';

export type CliCommandOptions<
  TPositionalArgParser extends AnyArgParser,
  TNamedArgParsers extends AnyNamedArgParsers,
  TEscapedArgParser extends AnyArgParser
> = {
  /**
   * Name used in command-line usage
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
   * property of the command. Similarly, the `options` argument type is derived from
   * `command.options`.
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
   * If true, don't show this command in usage docs.
   */
  hidden?: boolean;
};

/**
 * Interface describing a "command" command
 * @typeParam TPositionalArgParser Type of the "positional" arguments parser
 * @typeParam TNamedArgParsers Type of the ""
 */
export interface ICliCommand<
  TPositionalArgParser extends AnyArgParser,
  TNamedArgParsers extends AnyNamedArgParsers,
  TEscapedArgParser extends AnyArgParser
> extends CliCommandOptions<TPositionalArgParser, TNamedArgParsers, TEscapedArgParser> {
  commandType: typeof CLI_COMMAND;
}

/**
 *
 * A factory function for creating CLI command commands
 * @param options
 * @returns The newly-created `command`.
 */
export function CliCommand<
  TPositional extends AnyArgParser = ICliArgParser<undefined, false>,
  TNamed extends AnyNamedArgParsers = any,
  TEscaped extends AnyArgParser = ICliArgParser<undefined, false>
>(
  options: CliCommandOptions<TPositional, TNamed, TEscaped>,
): ICliCommand<TPositional, TNamed, TEscaped> {
  return {
    ...options,
    commandType: CLI_COMMAND,
  };
}
