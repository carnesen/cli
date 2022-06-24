import {
	CCliArgGroup,
	CCliArgGroupOptions,
	CCliParseArgs,
} from '../c-cli-arg-group';
import { CCliConditionalValue } from '../c-cli-conditional-value';

/** Options for {@link CliStringArgGroup} */
export type CCliStringArgGroupOptions<Optional extends boolean> =
	CCliArgGroupOptions<Optional>;

export type CCliStringArgGroupValue<Optional extends boolean> =
	CCliConditionalValue<string, Optional>;

/** `string`-valued argument group */
export class CCliStringArgGroup<Optional extends boolean> extends CCliArgGroup<
	CCliStringArgGroupValue<Optional>,
	Optional
> {
	public parse(
		args: CCliParseArgs<Optional>,
	): CCliStringArgGroupValue<Optional> {
		if (!args) {
			return this.undefinedAsValue();
		}
		this.assertSingleArg(args);
		return args[0];
	}

	/** {@link CCliStringArgGroup} factory function */
	public static create<Optional extends boolean>(
		options: CCliStringArgGroupOptions<Optional> = {},
	): CCliStringArgGroup<Optional> {
		return new CCliStringArgGroup<Optional>({
			placeholder: '<str>',
			...options,
		});
	}

	public _optional: Optional = this.options.optional as Optional;
}
