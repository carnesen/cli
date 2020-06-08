import { ICliParser } from '../cli-parser';
import { CliUsageError } from '../cli-usage-error';

/**
 * Options for the {@linkcode CliBooleanValuedParser} factory
 */
export type CliBooleanValuedParserOptions = {
  /** {@linkcode ICliParser.description} */
  description?: string;
  /** {@linkcode ICliParser.hidden} */
  hidden?: boolean;
};

/**
 * A factory for boolean-valued {@linkcode ICliParser}'s
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
export function CliBooleanValuedParser(
  options: CliBooleanValuedParserOptions = {},
): ICliParser<boolean, false> {
  const { description, hidden = false } = options;
  const parser: ICliParser<boolean, false> = {
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
  return parser;
}
