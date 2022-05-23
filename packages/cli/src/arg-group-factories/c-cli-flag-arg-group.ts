import {
	CCliAbstractArgGroup,
	CCliArgGroupOptions,
} from '../c-cli-abstract-arg-group';
import { CCliUsageError } from '../c-cli-usage-error';

/** Options for {@link CCliFlagArgGroup} */
export type CCliFlagArgGroupOptions = Pick<
	CCliArgGroupOptions<false>,
	'description' | 'hidden'
>;

/** A `boolean`-valued command-line argument group
 * @example
 * ```plaintext
 * $ cli           // named flag "foo" parses `false`
 * $ cli --foo     // named flag "foo" parses `true`
 * $ cli --foo bar // usage error
 * ``` */
export class CCliFlagArgGroup extends CCliAbstractArgGroup<boolean, false> {
	public parse(args: string[] | undefined): boolean {
		// `args` `undefined` means that the named argument separator e.g. `--foo`
		// was not passed on the command line
		if (!args) {
			return false;
		}
		if (args.length > 0) {
			throw new CCliUsageError(`Unexpected argument "${args[0]}"`);
		}
		return true;
	}

	public static create(
		options: CCliFlagArgGroupOptions = {},
	): CCliFlagArgGroup {
		return new CCliFlagArgGroup({
			placeholder: '',
			required: false,
			hidden: options.hidden,
			description: options.description,
		});
	}
}
