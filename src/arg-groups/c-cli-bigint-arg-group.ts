import {
	CCliArgGroup,
	CCliArgGroupOptions,
	CCliParseArgs,
} from '../c-cli-arg-group';
import { CCliConditionalValue } from '../c-cli-conditional-value';
import { convertToBigint } from '../convert-to-bigint';

/** Options for {@link CCliBigintArgGroup} */
export type CCliBigintArgGroupOptions<Optional extends boolean> =
	CCliArgGroupOptions<Optional>;

export type CCliBigintArgGroupValue<Optional extends boolean> =
	CCliConditionalValue<bigint, Optional>;

/** `number`-valued command-line argument group */
export class CCliBigintArgGroup<Optional extends boolean> extends CCliArgGroup<
	CCliBigintArgGroupValue<Optional>,
	Optional
> {
	public parse(
		args: CCliParseArgs<Optional>,
	): CCliBigintArgGroupValue<Optional> {
		if (!args) {
			return this.undefinedAsValue();
		}

		this.assertSingleArg(args);

		return convertToBigint(args[0]);
	}

	/** {@link CCliBigintArgGroup} factory function */
	public static create<Optional extends boolean>(
		options: CCliBigintArgGroupOptions<Optional> = {},
	): CCliBigintArgGroup<Optional> {
		return new CCliBigintArgGroup<Optional>({
			placeholder: '<integer>',
			...options,
		});
	}
}
