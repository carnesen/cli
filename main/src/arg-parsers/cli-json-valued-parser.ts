import parseJson = require('parse-json');

import { ICliParser } from '../cli-arg-parser';
import { CliUsageError } from '../cli-usage-error';

/** Options for the {@linkcode CliJsonValuedParser} factory */
export type CliJsonValuedParserOptions = {
  /** {@linkcode ICliParser.description} */
  description?: string;

  /** {@linkcode ICliParser.required} */
  required?: boolean;

  /** {@linkcode ICliParser.placeholder}. Defaults to "\<json\>" */
  placeholder?: string;

  /** {@linkcode ICliParser.hidden} */
  hidden?: boolean;
};

/**
 * A factory for {@linkcode ICliParser}s that `JSON.parse`
 *
 * @example
 * ```plaintext
 * $ cli --json '{"foo":true}' // named value "json" receives object `{ foo: true }`
 * $ cli --json                // usage error
 * $ cli --json '""' '""'      // usage error
 * $ cli --json foo            // error parsing JSON
 * ```
 *
 * @throws {@linkcode CliUsageError}
 */
export function CliJsonValuedParser(
  options: CliJsonValuedParserOptions = {},
): ICliParser<any> {
  const {
    placeholder = '<json>',
    required = false,
    description,
    hidden = false,
  } = options;
  const parser: ICliParser<any> = {
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
  return parser;
}
