import { ICliArgParser } from '../cli-arg-parser';
import { CliUsageError } from '../cli-usage-error';

/**
 * The type of {@linkcode CliStringArgParser}'s options parameter
 */
export type CliStringArgParserOptions = Partial<{
  required: boolean;
  description: string;
  defaultValue: string;
  hidden: boolean;
  placeholder: string;
}>;

/**
 * A factory for string-valued arg parsers
 *
 * @param options - An object of optional properties
 * @returns A string-valued arg parser
 */
function CliStringArgParser(
  options: CliStringArgParserOptions & { defaultValue: string },
): ICliArgParser<string, false>;
function CliStringArgParser(
  options: CliStringArgParserOptions & { required: true },
): ICliArgParser<string, true>;
function CliStringArgParser(
  options?: CliStringArgParserOptions,
): ICliArgParser<string | undefined, false>;
function CliStringArgParser(config: CliStringArgParserOptions = {}) {
  const {
    defaultValue,
    required = false,
    description,
    placeholder = '<str>',
    hidden = false,
  } = config;
  const argParser: ICliArgParser<string | undefined> = {
    hidden,
    placeholder,
    required,
    parse(args) {
      if (!args) {
        return typeof defaultValue === 'string' ? defaultValue : undefined;
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
  return argParser;
}

export { CliStringArgParser };
