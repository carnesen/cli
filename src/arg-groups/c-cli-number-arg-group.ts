import {
	CCliArgGroup,
	CCliArgGroupOptions,
	CCliParseArgs,
} from '../c-cli-arg-group';
import { CCliNumberConstraints, convertToNumber } from '../convert-to-number';
import { CCliConditionalValue } from '../c-cli-conditional-value';

/** Options for {@link CCliNumberArgGroup} */
export type CCliNumberArgGroupOptions<Optional extends boolean> =
	CCliArgGroupOptions<Optional> & CCliNumberConstraints;

export type CCliNumberArgGroupValue<Optional extends boolean> =
	CCliConditionalValue<number, Optional>;

/** `number`-valued command-line argument group */
export class CCliNumberArgGroup<Optional extends boolean> extends CCliArgGroup<
	CCliNumberArgGroupValue<Optional>,
	Optional
> {
	protected constructor(
		protected readonly numberOptions: CCliNumberArgGroupOptions<Optional>,
	) {
		super(numberOptions);
	}

	public parse(
		args: CCliParseArgs<Optional>,
	): CCliNumberArgGroupValue<Optional> {
		if (!args) {
			return this.undefinedAsValue();
		}

		this.assertSingleArg(args);

		const { integer, min, max } = this.numberOptions;
		return convertToNumber(args[0], { integer, min, max });
	}

	/** {@link CCliNumberArgGroup} factory function */
	public static create<Optional extends boolean>(
		options: CCliNumberArgGroupOptions<Optional> = {},
	): CCliNumberArgGroup<Optional> {
		return new CCliNumberArgGroup<Optional>({
			placeholder: options.integer ? '<int>' : '<num>',
			...options,
		});
	}
}
