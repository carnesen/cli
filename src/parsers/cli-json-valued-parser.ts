import { ICliParser } from '../cli-parser';
import { CliUsageError } from '../cli-usage-error';

/** Options for [[`CliJsonValuedParser`]] */
export interface ICliJsonValuedParserOptions {
	/** [[`ICliParser.description`]] */
	description?: string;

	/** [[`ICliParser.required`]] */
	required?: boolean;

	/** [[`ICliParser.placeholder`]]. Defaults to "\<json\>" */
	placeholder?: string;

	/** [[`ICliParser.hidden`]] */
	hidden?: boolean;
}

/**
 * A factory for [[`ICliParser`]]s that `JSON.parse`
 *
 * @example
 * ```plaintext
 * $ cli --json '{"foo":true}' // named value "json" receives object `{ foo: true }`
 * $ cli --json                // usage error
 * $ cli --json '""' '""'      // usage error
 * $ cli --json foo            // error parsing JSON
 * ```
 *
 * @throws [[`CliUsageError`]]
 */
export function CliJsonValuedParser(
	options: ICliJsonValuedParserOptions = {},
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
				const parsed = JSON.parse(args[0]);
				return parsed;
			} catch (exception) {
				throw new CliUsageError(exception.message);
			}
		},
		description,
	};
	return parser;
}
