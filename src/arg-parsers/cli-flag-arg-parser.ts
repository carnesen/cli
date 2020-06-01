import { ICliArgParser } from '../cli-arg-parser';
import { CliUsageError } from '../cli-usage-error';

export type CliFlagArgParserOptions = { description?: string; hidden?: boolean };

/**
 * A factory for command-line flag arg parsers
 *
 * @param options
 * If `options.hidden`, do not show in usage.
 *
 * @returns
 * A boolean-valued optional ArgParser
 *
 * @example
 * ```plaintext
 * $ cli           // named flag "foo" parses `false`
 * $ cli --foo     // named flag "foo" parses `true`
 * $ cli --foo bar // usage error
 * ```
 *
 * @throws {@linkcode CliUsageError}
 */
export function CliFlagArgParser(
  options: CliFlagArgParserOptions = {},
): ICliArgParser<boolean, false> {
  const { description, hidden = false } = options;
  const argParser: ICliArgParser<boolean, false> = {
    placeholder: '',
    required: false,
    hidden,
    parse(args) {
      if (!args) {
        return false;
      }
      if (args.length > 0) {
        throw new CliUsageError(`Unexpected argument "${args[0]}"`);
      }
      return true;
    },
    description,
  };
  return argParser;
}
