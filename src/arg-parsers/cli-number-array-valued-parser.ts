import { ICliParser } from '../cli-arg-parser';
import { convertToNumber } from '../util';
import { CliUsageError } from '../cli-usage-error';

/** Options for {@linkcode CliNumberArrayValuedParser} */
export type CliNumberArrayValuedParserOptions = {
  /** {@linkcode ICliParser.description} */
  description?: string;

  /** {@linkcode ICliParser.required} */
  required?: boolean;

  /** {@linkcode ICliParser.placeholder} defaulting to "\<num0\> [...]" */
  placeholder?: string;

  /** {@linkcode ICliParser.hidden} */
  hidden?: boolean;
};

/** A factory for required `number[]`-valued {@linkcode ICliParser}s */
function CliNumberArrayValuedParser(
  options: CliNumberArrayValuedParserOptions & { required: true },
): ICliParser<number[], true>;

/** A factory for optional `number[] | undefined`-valued {@linkcode ICliParser}s */
function CliNumberArrayValuedParser(
  options?: CliNumberArrayValuedParserOptions,
): ICliParser<number[] | undefined, boolean>;

// Implementation
function CliNumberArrayValuedParser(options: CliNumberArrayValuedParserOptions = {}) {
  const {
    required = false,
    description,
    placeholder = '<num0> [...]',
    hidden = false,
  } = options;
  const parser: ICliParser<number[] | undefined> = {
    required,
    hidden,
    parse(args) {
      if (!args) {
        return undefined;
      }

      if (args.length === 0) {
        throw new CliUsageError(`Expected one or more arguments ${placeholder}`);
      }

      return args.map(convertToNumber);
    },
    description,
    placeholder,
  };
  return parser;
}

export { CliNumberArrayValuedParser };
