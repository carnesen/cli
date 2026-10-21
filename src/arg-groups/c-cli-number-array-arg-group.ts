import {
	CCliArgGroup,
	CCliArgGroupOptions,
	CCliParseArgs,
} from '../c-cli-arg-group';
import { CCliConditionalValue } from '../c-cli-conditional-value';
import { CCliNumberConstraints, convertToNumber } from '../convert-to-number';

/** Options for {@link CCliNumberArrayArgGroup} a.k.a `ccli.numberArray` */
export type CCliNumberArrayArgGroupOptions<Optional extends boolean = boolean> =
	CCliArgGroupOptions<Optional> & CCliNumberConstraints;

export type CCliNumberArrayArgGroupValue<Optional extends boolean> =
	CCliConditionalValue<number[], Optional>;

/** `number[]`-valued argument group */
export class CCliNumberArrayArgGroup<
	Optional extends boolean,
> extends CCliArgGroup<CCliNumberArrayArgGroupValue<Optional>, Optional> {
	protected constructor(
		protected readonly numberOptions: CCliNumberArrayArgGroupOptions<Optional>,
	) {
		super(numberOptions);
	}

	public parse(
		args: CCliParseArgs<Optional>,
	): CCliNumberArrayArgGroupValue<Optional> {
		if (!args) {
			return this.undefinedAsValue();
		}

		this.assertOneOrMoreArgs(args);

		const { integer, min, max } = this.numberOptions;
		return args.map((arg) => convertToNumber(arg, { integer, min, max }));
	}

	/** {@link CCliNumberArrayArgGroup} factory function */
	public static create<Optional extends boolean>(
		options: CCliNumberArrayArgGroupOptions<Optional> = {},
	): CCliNumberArrayArgGroup<Optional> {
		return new CCliNumberArrayArgGroup<Optional>({
			placeholder: options.integer ? '<int0> [...]' : '<num0> [...]',
			...options,
		});
	}
}
