import {
	CCliArgGroup,
	CCliArgGroupOptions,
	CCliParseArgs,
} from '../c-cli-arg-group';
import { CCliConditionalValue } from '../c-cli-conditional-value';
import { convertToBigint } from '../convert-to-bigint';

/** Options for {@link CCliBigintArrayArgGroup} a.k.a `ccli.bigintArray` */
export type CCliBigintArrayArgGroupOptions<Optional extends boolean = boolean> =
	CCliArgGroupOptions<Optional>;

export type CCliNumberArrayArgGroupValue<Optional extends boolean> =
	CCliConditionalValue<bigint[], Optional>;

/** `number[]`-valued argument group */
export class CCliBigintArrayArgGroup<
	Optional extends boolean,
> extends CCliArgGroup<CCliNumberArrayArgGroupValue<Optional>, Optional> {
	public parse(
		args: CCliParseArgs<Optional>,
	): CCliNumberArrayArgGroupValue<Optional> {
		if (!args) {
			return this.undefinedAsValue();
		}

		this.assertOneOrMoreArgs(args);

		return args.map(convertToBigint);
	}

	/** {@link CCliBigintArrayArgGroup} factory function */
	public static create<Optional extends boolean>(
		options: CCliBigintArrayArgGroupOptions<Optional> = {},
	): CCliBigintArrayArgGroup<Optional> {
		return new CCliBigintArrayArgGroup<Optional>({
			placeholder: '<integer0> [...]',
			...options,
		});
	}
}
