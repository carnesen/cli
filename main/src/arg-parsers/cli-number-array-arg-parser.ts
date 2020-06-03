import { ICliArgParser } from '../cli-arg-parser';
import { convertToNumber } from '../util';
import { CliUsageError } from '../cli-usage-error';

/**
 * Type of {@linkcode CliNumberArrayArgParser}'s `options` parameter
 */
export type CliNumberArrayArgParserOptions = {
  description?: string;
  required?: boolean;
  placeholder?: string;
  hidden?: boolean;
};

/**
 * A factory function for creating number-array-valued arg parsers
 * @param options
 * @returns A number-array-valued arg parser
 */
function CliNumberArrayArgParser(
  config: CliNumberArrayArgParserOptions & { required: true },
): ICliArgParser<number[], true>;
function CliNumberArrayArgParser(
  config?: CliNumberArrayArgParserOptions,
): ICliArgParser<number[] | undefined, boolean>;
function CliNumberArrayArgParser(config: CliNumberArrayArgParserOptions = {}) {
  const {
    required = false,
    description,
    placeholder = '<num0> [...]',
    hidden = false,
  } = config;
  const argParser: ICliArgParser<number[] | undefined> = {
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
  return argParser;
}

export { CliNumberArrayArgParser };
