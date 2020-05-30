import parseJson = require('parse-json');

import { CliArgParser } from '../types';
import { CliUsageError } from '../cli-usage-error';

export type CliJsonArgParserOptions = {
  description?: string;
  required?: boolean;
  /**
   * Defaults to <json>
   */
  placeholder?: string;
  hidden?: boolean;
};

/**
 * A factory for arg parsers that JSON.parse the command-line arguments
 *
 * @param options
 *
 * @returns
 * An any-valued ArgParser
 *
 * @example
 * ```text
 * $ cli --json '{"foo":true}' // named value "json" receives object `{ foo: true }`
 * $ cli --json           // usage error
 * $ cli --json '""' '""' // usage error
 * $ cli --json foo // error parsing JSON
 * ```
 *
 * @throws {@linkcode CliUsageError}
 */

export function CliJsonArgParser(
  options: CliJsonArgParserOptions = {},
): CliArgParser<any> {
  const {
    placeholder = '<json>',
    required = false,
    description,
    hidden = false,
  } = options;
  const argParser: CliArgParser<any> = {
    required,
    placeholder,
    hidden,
    parse(args) {
      if (!args) {
        return undefined;
      }
      if (args.length !== 1) {
        throw new CliUsageError(`Expected a single ${placeholder} string`);
      }
      try {
        const parsed = parseJson(args[0]);
        return parsed;
      } catch (exception) {
        throw new CliUsageError(exception.message);
      }
    },
    description,
  };
  return argParser;
}
