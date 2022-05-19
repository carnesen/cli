import { CliArgGroup } from '../cli-arg-group';
import { CliUsageError } from '../cli-usage-error';

/** Options for [[`CliJsonArgGroup`]] */
export type CliJsonArgGroupOptions = {
	/** See [[`CliArgGroup.description`]] */
	description?: string;

	/** See [[`CliArgGroup.required`]] */
	required?: boolean;

	/** See [[`CliArgGroup.placeholder`]]. Defaults to "\<json\>" */
	placeholder?: string;

	/** See [[`CliArgGroup.hidden`]] */
	hidden?: boolean;
};

/**
 * A factory for [[`CliArgGroup`]]s that `JSON.parse`
 *
 * @example
 * Suppose our CLI's positionalArgGroup is a CliJsonArgGroup. Here's how that
 * behaves:
 * ```plaintext
 * $ cli '{"foo":true}' // named value "json" receives object `{ foo: true }`
 * $ cli                // usage error
 * $ cli '""' '""'      // usage error
 * $ cli foo            // error parsing JSON
 * ```
 *
 * @throws [[`CliUsageError`]]
 */
export function CliJsonArgGroup(
	options: CliJsonArgGroupOptions = {},
): CliArgGroup<any> {
	const {
		placeholder = '<json>',
		required = false,
		description,
		hidden = false,
	} = options;
	const argGroup: CliArgGroup<any> = {
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
			} catch (exception: any) {
				throw new CliUsageError(exception.message);
			}
		},
		description,
	};
	return argGroup;
}
