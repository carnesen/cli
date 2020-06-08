import {
  AnyParser,
  AnyNamedParsers,
  ValueFromParser,
  NamedValues,
  ICliParser,
} from './cli-parser';

/** "kind" of a {@linkcode ICliCommand} */
export const CLI_COMMAND = 'CLI_COMMAND';

/** Options for {@linkcode CliCommand} */
export interface ICliCommandOptions<
  TPositionalParser extends AnyParser,
  TNamedParsers extends AnyNamedParsers,
  TEscapedParser extends AnyParser
> {
  /** Identifier for this command in command-line usage */
  name: string;

  /** Function or async function that implements the command */
  action: (
    positionalValue: ValueFromParser<TPositionalParser>,
    namedValues: NamedValues<TNamedParsers>,
    escapedValue: ValueFromParser<TEscapedParser>,
  ) => any;

  /** A {@linkcode ICliParser} for the arguments before the first separator argument */
  positionalParser?: TPositionalParser;

  /** A {@linkcode ICliParser} for the arguments passed as "--name value" */
  namedParsers?: TNamedParsers;

  /** A {@linkcode ICliParser} for the arguments after a lone "--" */
  escapedParser?: TEscapedParser;

  /** A sentence or two about this command for command-line usage */
  description?: string;

  /** If `true`, don't show this command in command-line usage */
  hidden?: boolean;
}

/** An object that defines a CLI command and its arguments */
export interface ICliCommand<
  TPositionalParser extends AnyParser,
  TNamedParsers extends AnyNamedParsers,
  TEscapedParser extends AnyParser
> extends ICliCommandOptions<TPositionalParser, TNamedParsers, TEscapedParser> {
  /** The string literal {@linkcode CLI_COMMAND} */
  kind: typeof CLI_COMMAND;
}

/** A factory for {@linkcode ICliCommand}s */
export function CliCommand<
  TPositionalParser extends AnyParser = ICliParser<undefined, false>,
  TNamedParsers extends AnyNamedParsers = any,
  TEscapedParser extends AnyParser = ICliParser<undefined, false>
>(
  options: ICliCommandOptions<TPositionalParser, TNamedParsers, TEscapedParser>,
): ICliCommand<TPositionalParser, TNamedParsers, TEscapedParser> {
  return {
    ...options,
    kind: CLI_COMMAND,
  };
}
