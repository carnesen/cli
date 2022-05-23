import {
	CCliAbstractArgGroup,
	CCliArgGroupOptions,
	CCliParseArgs,
} from '../c-cli-abstract-arg-group';
import { convertToNumber } from '../util';

/** Options for {@link CCliNumberArrayArgGroup} a.k.a `ccli.numberArray` */
export type CCliNumberArrayArgGroupOptions<Required extends boolean = boolean> =
	CCliArgGroupOptions<Required>;

export type CCliNumberArrayArgGroupValue<Required extends boolean> =
	Required extends true ? number[] : number[] | undefined;

export class CCliNumberArrayArgGroup<
	Required extends boolean,
> extends CCliAbstractArgGroup<
	CCliNumberArrayArgGroupValue<Required>,
	Required
> {
	public parse(
		args: CCliParseArgs<Required>,
	): CCliNumberArrayArgGroupValue<Required> {
		if (!args) {
			return this.undefinedAsValue();
		}

		this.assertOneOrMoreArgs(args);

		return args.map(convertToNumber);
	}

	/** A factory for `number`-valued required argument groups */
	public static create<Required extends boolean>(
		options: CCliNumberArrayArgGroupOptions<Required> = {},
	): CCliNumberArrayArgGroup<Required> {
		return new CCliNumberArrayArgGroup<Required>({
			placeholder: '<num0> [...]',
			...options,
		});
	}
}
