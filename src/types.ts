import { CLI_BRANCH, CLI_LEAF } from './constants';

type ArgsForGetValue<TRequired extends boolean> = TRequired extends true
  ? string[]
  : string[] | undefined;

export type CliArgParser<TValue, TRequired extends boolean = boolean> = {
  placeholder: string;
  getValue:
    | ((args: ArgsForGetValue<TRequired>) => TValue)
    | ((args: ArgsForGetValue<TRequired>) => Promise<TValue>);
  description?: string;
  required?: TRequired;
  hidden?: boolean;
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
  subcommands: (CliBranch | CliLeaf<any, any, any>)[];
  next?: CliBranch | CliLeaf<any, any, any>;
};

export type CliLeaf<
  TPositionalArgParser extends AnyArgParser,
  TNamedArgParsers extends AnyNamedArgParsers,
  TEscapedArgParser extends AnyArgParser
> = {
  commandType: typeof CLI_LEAF;
  name: string;
  action: (
    positionalValue: ValueFromArgParser<TPositionalArgParser>,
    namedValues: NamedValues<TNamedArgParsers>,
    escapedValue: ValueFromArgParser<TEscapedArgParser>,
  ) => any;
  positionalArgParser?: TPositionalArgParser;
  namedArgParsers?: TNamedArgParsers;
  escapedArgParser?: TEscapedArgParser;
  description?: string;
  hidden?: boolean;
};

export type Command = CliBranch | CliLeaf<AnyArgParser, AnyNamedArgParsers, AnyArgParser>;
export type AnyCommand = CliBranch | CliLeaf<any, any, any>;

// The "commandType" field is assigned internally by the framework.
// This helper function is used to remove that field for the argParser
// type of the createLeaf and CliBranch factories.
export type ExcludeCommandType<T extends { commandType: any }> = Pick<
  T,
  Exclude<keyof T, 'commandType'>
>;
