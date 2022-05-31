import {
	CCliArgGroup,
	CCliArgGroupOptions,
	CCliParseArgs,
} from '../c-cli-arg-group';
import { CCliUsageError } from '../c-cli-usage-error';

/** Options for {@link CCliJsonArgGroup} */
export type CCliJsonArgGroupOptions = CCliArgGroupOptions<boolean>;

export type CCliJsonArgGroupValue = any;

/** `any`-valued command-line argument group that `JSON.parse`'s
 *
 * For example, suppose our CLI has a `CCliJsonArgGroup` for its
 * `positionalArgGroup`. Here's how that behaves:
 * ```plaintext
 * $ cli '{"foo":true}' // named value receives object `{ foo: true }`
 * $ cli                // usage error
 * $ cli '""' '""'      // usage error
 * $ cli foo            // error parsing JSON
 * ``` */
export class CCliJsonArgGroup extends CCliArgGroup<CCliJsonArgGroupValue> {
	public parse(args: CCliParseArgs<boolean>): CCliJsonArgGroupValue {
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

	/** {@link CCliJsonArgGroup} factory function */
	public static create(
		options: CCliJsonArgGroupOptions = {},
	): CCliJsonArgGroup {
		return new CCliJsonArgGroup({
			placeholder: '<json>',
			...options,
		});
	}
}
