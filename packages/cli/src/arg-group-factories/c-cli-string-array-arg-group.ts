import {
	CCliArgGroup,
	CCliArgGroupOptions,
	CCliParseArgs,
} from '../c-cli-arg-group';

/** Options for {@link CliStringArgGroup} */
export type CCliStringArrayArgGroupOptions<Required extends boolean> =
	CCliArgGroupOptions<Required>;

export type CCliStringArrayArgGroupValue<Required extends boolean> =
	Required extends true ? string[] : string[] | undefined;

/** A factory for required `string`-valued argument groups */
export class CCliStringArrayArgGroup<
	Required extends boolean,
> extends CCliArgGroup<CCliStringArrayArgGroupValue<Required>, Required> {
	public parse(
		args: CCliParseArgs<Required>,
	): CCliStringArrayArgGroupValue<Required> {
		if (!args) {
			return this.undefinedAsValue();
		}
		this.assertOneOrMoreArgs(args);
		return args;
	}

	public static create<Required extends boolean>(
		options: CCliStringArrayArgGroupOptions<Required> = {},
	): CCliStringArrayArgGroup<Required> {
		return new CCliStringArrayArgGroup<Required>({
			placeholder: '<str0> [...]',
			...options,
		});
	}
}
