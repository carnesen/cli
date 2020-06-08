import { ICliParser } from '../cli-parser';
import { convertToNumber } from '../util';
import { CliUsageError } from '../cli-usage-error';

/** Options for the {@linkcode CliNumberValuedParser} factory */
export type CliNumberValuedParserOptions = {
  /** {@linkcode ICliParser.required} */
  required?: boolean;

  /** {@linkcode ICliParser.description} */
  description?: string;

  /** {@linkcode ICliParser.placeholder} defaulting to "\<num\>" */
  placeholder?: string;

  /** {@linkcode ICliParser.description} */
  hidden?: boolean;
};

/** A factory for `number`-valued required {@linkcode ICliParser}s */
function CliNumberValuedParser(
  options: CliNumberValuedParserOptions & { required: true },
): ICliParser<number, true>;

/** A factory for `number | undefined`-valued optional {@linkcode ICliParser}s */
function CliNumberValuedParser(
  options?: CliNumberValuedParserOptions,
): ICliParser<number | undefined, boolean>;

// Implementation
function CliNumberValuedParser(config: CliNumberValuedParserOptions = {}) {
  const { required = false, description, placeholder = '<num>', hidden = false } = config;
  const parser: ICliParser<number | undefined> = {
    required,
    hidden,
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

      return convertToNumber(args[0]);
    },
    description,
    placeholder,
  };
  return parser;
}

export { CliNumberValuedParser };
