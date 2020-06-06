import { ICliParser } from '../cli-arg-parser';
import { CliUsageError } from '../cli-usage-error';

/** Options for {@linkcode CliStringArrayValuedParser} */
export type CliStringArrayValuedParserOptions = {
  /** {@linkcode ICliParser.description} */
  description?: string;

  /** {@linkcode ICliParser.required} */
  required?: boolean;

  /** {@linkcode ICliParser.required} */
  hidden?: boolean;

  /** {@linkcode ICliParser.placeholder} defaulting to "\<str0\> [...]" */
  placeholder?: string;
};

/** A factory for required `string[]`-valued {@linkcode ICliParser}s */
function CliStringArrayValuedParser(
  options: CliStringArrayValuedParserOptions & { required: true },
): ICliParser<string[], true>;

/** A factory for optional `string[] | undefined`-valued {@linkcode ICliParser}s */
function CliStringArrayValuedParser(
  options?: CliStringArrayValuedParserOptions,
): ICliParser<string[] | undefined, boolean>;

// Implementation
function CliStringArrayValuedParser(options: CliStringArrayValuedParserOptions = {}) {
  const {
    required = false,
    description,
    placeholder = '<str0> [...]',
    hidden = false,
  } = options;
  const parser: ICliParser<string[] | undefined> = {
    required,
    hidden,
    placeholder,
    parse(args) {
      if (!args) {
        return undefined;
      }

      if (args.length === 0) {
        throw new CliUsageError(`Expected one or more values ${placeholder}`);
      }

      return args;
    },
    description,
  };
  return parser;
}

export { CliStringArrayValuedParser };
