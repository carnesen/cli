import {
	CCliArgGroup,
	CCliArgGroupOptions,
	CCliParseArgs,
} from '../c-cli-arg-group';
import { CCliUsageError } from '../c-cli-usage-error';

/** Options for {@link CCliJsonArgGroup} */
export type CCliJsonArgGroupOptions = CCliArgGroupOptions;

/** `any`-valued command-line interface argument group that `JSON.parse`'s
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
 * @throws {@link CCliUsageError} */

export type CCliJsonArgGroupValue = any;

export class CCliJsonArgGroup extends CCliArgGroup<CCliJsonArgGroupValue> {
	public parse(args: CCliParseArgs): CCliJsonArgGroupValue {
		if (!args) {
			return undefined;
		}
		this.assertSingleArg(args);
		try {
			const parsed = JSON.parse(args[0]);
			return parsed;
		} catch (exception: any) {
			throw new CCliUsageError(exception.message);
		}
	}

	public static create(
		options: CCliJsonArgGroupOptions = {},
	): CCliJsonArgGroup {
		return new CCliJsonArgGroup({
			placeholder: '<json>',
			...options,
		});
	}
}
