import {
	CCliArgGroup,
	CCliArgGroupOptions,
	CCliParseArgs,
} from '../c-cli-arg-group';
import { CCliConditionalValue } from '../c-cli-conditional-value';

/** Options for {@link CliStringArgGroup} */
export type CCliStringArrayArgGroupOptions<Optional extends boolean> =
	CCliArgGroupOptions<Optional>;

export type CCliStringArrayArgGroupValue<Optional extends boolean> =
	CCliConditionalValue<string[], Optional>;

/** `string[]`-valued argument group */
export class CCliStringArrayArgGroup<
	Optional extends boolean,
> extends CCliArgGroup<CCliStringArrayArgGroupValue<Optional>, Optional> {
	public parse(
		args: CCliParseArgs<Optional>,
	): CCliStringArrayArgGroupValue<Optional> {
		if (!args) {
			return this.undefinedAsValue();
		}
		this.assertOneOrMoreArgs(args);
		return args;
	}

	public static create<Optional extends boolean>(
		options: CCliStringArrayArgGroupOptions<Optional> = {},
	): CCliStringArrayArgGroup<Optional> {
		return new CCliStringArrayArgGroup<Optional>({
			placeholder: '<str0> [...]',
			...options,
		});
	}
}
