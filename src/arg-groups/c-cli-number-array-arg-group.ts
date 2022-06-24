import {
	CCliArgGroup,
	CCliArgGroupOptions,
	CCliParseArgs,
} from '../c-cli-arg-group';
import { CCliConditionalValue } from '../c-cli-conditional-value';
import { convertToNumber } from '../util';

/** Options for {@link CCliNumberArrayArgGroup} a.k.a `ccli.numberArray` */
export type CCliNumberArrayArgGroupOptions<Optional extends boolean = boolean> =
	CCliArgGroupOptions<Optional>;

export type CCliNumberArrayArgGroupValue<Optional extends boolean> =
	CCliConditionalValue<number[], Optional>;

/** `number[]`-valued argument group */
export class CCliNumberArrayArgGroup<
	Optional extends boolean,
> extends CCliArgGroup<CCliNumberArrayArgGroupValue<Optional>, Optional> {
	public parse(
		args: CCliParseArgs<Optional>,
	): CCliNumberArrayArgGroupValue<Optional> {
		if (!args) {
			return this.undefinedAsValue();
		}

		this.assertOneOrMoreArgs(args);

		return args.map(convertToNumber);
	}

	/** {@link CCliNumberArrayArgGroup} factory function */
	public static create<Optional extends boolean>(
		options: CCliNumberArrayArgGroupOptions<Optional> = {},
	): CCliNumberArrayArgGroup<Optional> {
		return new CCliNumberArrayArgGroup<Optional>({
			placeholder: '<num0> [...]',
			...options,
		});
	}
}
