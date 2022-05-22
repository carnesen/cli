import { CCliArgGroup } from '../c-cli-arg-group';
import { CCliUsageError } from '../c-cli-usage-error';

/** Options for {@link CliJsonArgGroup} */
export type CliJsonArgGroupOptions = {
	/** See {@link CliArgGroup.description} */
	description?: string;

	/** See {@link CliArgGroup.required} */
	required?: boolean;

	/** See {@link CliArgGroup.placeholder}. Defaults to "\<json\>" */
	placeholder?: string;

	/** See {@link CliArgGroup.hidden} */
	hidden?: boolean;
};

/** A factory for {@link CliArgGroup}s that `JSON.parse`
 *
 * @example
 * Suppose our CLI's positionalArgGroup is a CliJsonArgGroup. Here's how that
 * behaves:
 * ```plaintext
 * $ cli '{"foo":true}' // named value receives object `{ foo: true }`
 * $ cli                // usage error
 * $ cli '""' '""'      // usage error
 * $ cli foo            // error parsing JSON
 * ```
 * @throws {@link CliUsageError} */
export function CliJsonArgGroup(
	options: CliJsonArgGroupOptions = {},
): CCliArgGroup<any> {
	const {
		placeholder = '<json>',
		required = false,
		description,
		hidden = false,
	} = options;
	const argGroup: CCliArgGroup<any> = {
		required,
		placeholder,
		hidden,
		parse(args) {
			if (!args) {
				return undefined;
			}
			if (args.length !== 1) {
				throw new CCliUsageError(`Expected a single ${placeholder} string`);
			}
			try {
				const parsed = JSON.parse(args[0]);
				return parsed;
			} catch (exception: any) {
				throw new CCliUsageError(exception.message);
			}
		},
		description,
	};
	return argGroup;
}
