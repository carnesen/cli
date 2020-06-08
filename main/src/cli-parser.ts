/**
 * Defines the type of the args passed to an {@linkcode ICliValuedParser}
 * @typeParam TRequired If `true`, the `args` parameter might be `undefined`
 */
export type CliArgs<TRequired extends boolean> = TRequired extends true
  ? string[]
  : string[] | undefined;

/**
 * An object for parsing a well-typed value from string arguments
 * @typeParam TValue Type of the parsed value
 * @typeParam TRequired If `true`, the parser won't receive `undefined`
 */
export interface ICliParser<TValue extends any, TRequired extends boolean = boolean> {
  /** Function or async function that parses a well-typed value from string arguments */
  parse:
    | ((args: CliArgs<TRequired>) => TValue)
    | ((args: CliArgs<TRequired>) => Promise<TValue>);

  /** A short placeholder for this argument in command-line usage e.g. "\<str\>"
   * */
  placeholder: string;

  /** A sentence or two describing this argument for command-line usage */
  description?: string;

  /** If true, the CLI will not show this parser in command-line usage */
  hidden?: boolean;

  /** A {@linkcode CliUsageError} is thrown if a required argument is not provided */
  required?: TRequired;
}

export type AnyParser = ICliParser<any>;

export type ValueFromParser<TParser> = TParser extends ICliParser<infer U, any>
  ? U
  : never;

export type AnyNamedParsers = {
  [name: string]: AnyParser;
};

export type NamedValues<TNamedParsers extends AnyNamedParsers> = {
  [K in keyof TNamedParsers]: ValueFromParser<TNamedParsers[K]>;
};
