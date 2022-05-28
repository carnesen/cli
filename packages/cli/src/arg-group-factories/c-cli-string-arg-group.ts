import {
	CCliArgGroup,
	CCliArgGroupOptions,
	CCliParseArgs,
} from '../c-cli-arg-group';

/** Options for {@link CliStringArgGroup} */
export type CCliStringArgGroupOptions<Required extends boolean> =
	CCliArgGroupOptions<Required>;

export type CCliStringArgGroupValue<Required extends boolean> =
	Required extends true ? string : string | undefined;

/** A factory for required `string`-valued argument groups */
export class CCliStringArgGroup<Required extends boolean> extends CCliArgGroup<
	CCliStringArgGroupValue<Required>,
	Required
> {
	public parse(
		args: CCliParseArgs<Required>,
	): CCliStringArgGroupValue<Required> {
		if (!args) {
			return this.undefinedAsValue();
		}
		this.assertSingleArg(args);
		return args[0];
	}

	public static create<Required extends boolean>(
		options: CCliStringArgGroupOptions<Required> = {},
	): CCliStringArgGroup<Required> {
		return new CCliStringArgGroup<Required>({
			placeholder: '<str>',
			...options,
		});
	}
}
