import { CLI_BRANCH, CLI_LEAF } from './constants';

type MaybeArgs<TRequired extends boolean> = TRequired extends true
  ? string[]
  : string[] | undefined;

/**
 * An object for converting a command-line arguments into well-typed values
 * @typeParam TValue Type of the value returned by `parse`
 * @typeParam TRequired If `true`, throw in `parse` if `args.length === 0`
 * @remarks
 */
export type CliArgParser<TValue extends any, TRequired extends boolean = boolean> = {
  description?: string;
  hidden?: boolean;
  parse:
    | ((args: MaybeArgs<TRequired>) => TValue)
    | ((args: MaybeArgs<TRequired>) => Promise<TValue>);
  placeholder: string;
  required?: TRequired;
};

export type AnyArgParser = CliArgParser<any>;

export type ValueFromArgParser<TArgParser> = TArgParser extends CliArgParser<infer U, any>
  ? U
  : never;

export type AnyNamedArgParsers = {
  [name: string]: AnyArgParser;
};

export type NamedValues<TNamedArgParsers extends AnyNamedArgParsers> = {
  [K in keyof TNamedArgParsers]: ValueFromArgParser<TNamedArgParsers[K]>;
};

export type CliBranch = {
  commandType: typeof CLI_BRANCH;
  name: string;
  description?: string;
  hidden?: boolean;
  subcommands: (CliBranch | ICliLeaf<any, any, any>)[];
};

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

export interface ICliLeaf<
  TPositionalArgParser extends AnyArgParser,
  TNamedArgParsers extends AnyNamedArgParsers,
  TEscapedArgParser extends AnyArgParser
> extends CliLeafOptions<TPositionalArgParser, TNamedArgParsers, TEscapedArgParser> {
  commandType: typeof CLI_LEAF;
}

export type AnyCliLeaf = ICliLeaf<AnyArgParser, AnyNamedArgParsers, AnyArgParser>;
export type Command = CliBranch | AnyCliLeaf;
export type AnyCommand = CliBranch | ICliLeaf<any, any, any>;

export type CommandStack = {
  parents: CliBranch[];
  current: Command;
};

export type LeafStack = { parents: CliBranch[]; current: AnyCliLeaf };

// The "commandType" field is assigned internally by the framework.
// This helper function is used to remove that field for the argParser
// type of the createLeaf and CliBranch factories.
export type ExcludeCommandType<T extends { commandType: any }> = Pick<
  T,
  Exclude<keyof T, 'commandType'>
>;
