/**
 * Defines the type of the args passed to an {@linkcode ICliArgParser}
 * @typeParam TRequired If `true`, the `args` parameter might be `undefined`
 */
export type CliArgs<TRequired extends boolean> = TRequired extends true
  ? string[]
  : string[] | undefined;

/**
 * Interface describing an "argument parser" object for converting string arguments
 * well-typed values.
 * @typeParam TValue Type of the parsed value
 * @typeParam TRequired If `true`, `undefined` is removed from the input type to `parse`
 */
export interface ICliArgParser<TValue extends any, TRequired extends boolean = boolean> {
  /** Function or async function that converts an array of string arguments into a
   * well-typed value */
  parse:
    | ((args: CliArgs<TRequired>) => TValue)
    | ((args: CliArgs<TRequired>) => Promise<TValue>);
  /** For representing this argument in command-line usage. The default placeholders are
   * like "\<str\>" */
  placeholder: string;
  /** For describing this argument in command-line usage */
  description?: string;
  /** If true, the CLI will not show this arg parser in command-line usage */
  hidden?: boolean;
  /** The CLI will throw a {@linkcode CliUsageError} if a required argument is not
   * provided */
  required?: TRequired;
}

export type AnyArgParser = ICliArgParser<any>;

export type ValueFromArgParser<TArgParser> = TArgParser extends ICliArgParser<
  infer U,
  any
>
  ? U
  : never;

export type AnyNamedArgParsers = {
  [name: string]: AnyArgParser;
};

export type NamedValues<TNamedArgParsers extends AnyNamedArgParsers> = {
  [K in keyof TNamedArgParsers]: ValueFromArgParser<TNamedArgParsers[K]>;
};
