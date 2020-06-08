import { ICliParser } from '../cli-parser';
import { CliUsageError } from '../cli-usage-error';

/** Options for {@linkcode CliStringValuedParser} */
export type CliStringValuedParserOptions = {
  /** {@linkcode ICliParser.required} */
  required?: boolean;

  /** {@linkcode ICliParser.description} */
  description?: string;

  /** {@linkcode ICliParser.hidden} */
  hidden?: boolean;

  /** {@linkcode ICliParser.placeholder} defaulting to "\<str\>" */
  placeholder?: string;
};

/** A factory for required `string`-valued {@linkcode ICliParser}s */
function CliStringValuedParser(
  options: CliStringValuedParserOptions & { required: true },
): ICliParser<string, true>;

/** A factory for optional `string | undefined`-valued {@linkcode ICliParser}s */
function CliStringValuedParser(
  options?: CliStringValuedParserOptions,
): ICliParser<string | undefined, false>;

// Implementation
function CliStringValuedParser(options: CliStringValuedParserOptions = {}) {
  const {
    required = false,
    description,
    placeholder = '<str>',
    hidden = false,
  } = options;
  const parser: ICliParser<string | undefined> = {
    hidden,
    placeholder,
    required,
    parse(args) {
      if (!args) {
        return undefined;
      }

      if (args.length > 1) {
        throw new CliUsageError(`Expected just one ${placeholder}`);
      }

      if (args.length === 0) {
        throw new CliUsageError(`Expected a ${placeholder}`);
      }

      return args[0];
    },
    description,
  };
  return parser;
}

export { CliStringValuedParser };
