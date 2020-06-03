import { ICliArgParser } from '../cli-arg-parser';
import { convertToNumber } from '../util';
import { CliUsageError } from '../cli-usage-error';

/**
 * Type of {@linkcode CliNumberArgParser}'s `options` parameter
 */
export type CliNumberArgParserOptions = {
  required?: boolean;
  description?: string;
  defaultValue?: number;
  /**
   * Defaults to <num>
   */
  placeholder?: string;
  hidden?: boolean;
};

/**
 * A factory function for creating number-valued arg parsers
 * @param options
 * @returns A number-valued arg parser
 */
function CliNumberArgParser(
  options: CliNumberArgParserOptions & { defaultValue: number },
): ICliArgParser<number, false>;
function CliNumberArgParser(
  config: CliNumberArgParserOptions & { required: true },
): ICliArgParser<number, true>;
function CliNumberArgParser(
  config?: CliNumberArgParserOptions,
): ICliArgParser<number | undefined, boolean>;
function CliNumberArgParser(config: CliNumberArgParserOptions = {}) {
  const {
    required = false,
    description,
    defaultValue,
    placeholder = '<num>',
    hidden = false,
  } = config;
  const argParser: ICliArgParser<number | undefined> = {
    required,
    hidden,
    parse(args) {
      if (!args) {
        return typeof defaultValue === 'number' ? defaultValue : undefined;
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
  return argParser;
}

export { CliNumberArgParser };
