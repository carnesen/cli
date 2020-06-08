import { ICliParser } from '../cli-parser';
import { convertToNumber } from '../util';
import { CliUsageError } from '../cli-usage-error';

/** Options for the [[`CliNumberValuedParser`]] factory */
export type CliNumberValuedParserOptions = {
  /** [[`ICliParser.required`]] */
  required?: boolean;

  /** [[`ICliParser.description`]] */
  description?: string;

  /** [[`ICliParser.placeholder`]] defaulting to "\<num\>" */
  placeholder?: string;

  /** [[`ICliParser.description`]] */
  hidden?: boolean;
};

/** A factory for `number`-valued required [[`ICliParser`]]s */
function CliNumberValuedParser(
  options: CliNumberValuedParserOptions & { required: true },
): ICliParser<number, true>;

/** A factory for `number | undefined`-valued optional [[`ICliParser`]]s */
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
