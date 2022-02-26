import { ICliArgGroup } from '../cli-arg-group';
import { CliUsageError } from '../cli-usage-error';

/** Options for [[`CliJsonArgGroup`]] */
export interface ICliJsonArgGroupOptions {
	/** See [[`ICliArgGroup.description`]] */
	description?: string;

	/** See [[`ICliArgGroup.required`]] */
	required?: boolean;

	/** See [[`ICliArgGroup.placeholder`]]. Defaults to "\<json\>" */
	placeholder?: string;

	/** See [[`ICliArgGroup.hidden`]] */
	hidden?: boolean;
}

/**
 * A factory for [[`ICliArgGroup`]]s that `JSON.parse`
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
	options: ICliJsonArgGroupOptions = {},
): ICliArgGroup<any> {
	const {
		placeholder = '<json>',
		required = false,
		description,
		hidden = false,
	} = options;
	const argGroup: ICliArgGroup<any> = {
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
