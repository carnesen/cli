import { CCliArgGroup, CCliArgGroupOptions } from '../c-cli-arg-group';
import { CCliConditionalValue } from '../c-cli-conditional-value';
import { CCliUsageError } from '../c-cli-usage-error';

/** A {@link CCliFlagArgGroup} always returns a value `true` (or `undefined`) */
type CCliFlagArgGroupValue = true;

/** A {@link CCliFlagArgGroup} is always optional */
type CCliFlagArgGroupOptional = true;

/** Options for {@link CCliFlagArgGroup} */
export type CCliFlagArgGroupOptions = Pick<
	CCliArgGroupOptions<true>,
	'description' | 'hidden'
>;

/** A `boolean`-valued command-line argument group. This argument group type
 * only makes sense as a named argument. For example if a CLI has a named flag
 * argument group "foo", here's how that CLI behaves:
 * ```plaintext
 * $ cli           // named value "foo" is `undefined`
 * $ cli --foo     // named value "foo" is `true`
 * $ cli --foo bar // usage error
 * ``` */
export class CCliFlagArgGroup extends CCliArgGroup<
	CCliFlagArgGroupValue,
	CCliFlagArgGroupOptional
> {
	public parse(
		args: string[] | undefined,
	): CCliConditionalValue<CCliFlagArgGroupValue, CCliFlagArgGroupOptional> {
		// `args` `undefined` means that the named argument separator e.g. `--foo`
		// was not passed on the command line
		if (!args) {
			return undefined;
		}
		if (args.length > 0) {
			throw new CCliUsageError(`Unexpected argument "${args[0]}"`);
		}
		return true;
	}

	/** Factory for boolean-valued {@link CCliFlagArgGroup}s */
	public static create(
		options: CCliFlagArgGroupOptions = {},
	): CCliFlagArgGroup {
		return new CCliFlagArgGroup({
			placeholder: '',
			optional: true,
			hidden: options.hidden,
			description: options.description,
		});
	}
}
