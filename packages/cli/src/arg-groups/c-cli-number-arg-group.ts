import {
	CCliArgGroup,
	CCliArgGroupOptions,
	CCliParseArgs,
} from '../c-cli-arg-group';
import { convertToNumber } from '../convert-to-number';
import { CCliConditionalValue } from '../c-cli-conditional-value';

/** Options for {@link CCliNumberArgGroup} */
export type CCliNumberArgGroupOptions<Optional extends boolean> =
	CCliArgGroupOptions<Optional>;

export type CCliNumberArgGroupValue<Optional extends boolean> =
	CCliConditionalValue<number, Optional>;

/** `number`-valued command-line argument group */
export class CCliNumberArgGroup<Optional extends boolean> extends CCliArgGroup<
	CCliNumberArgGroupValue<Optional>,
	Optional
> {
	public parse(
		args: CCliParseArgs<Optional>,
	): CCliNumberArgGroupValue<Optional> {
		if (!args) {
			return this.undefinedAsValue();
		}

		this.assertSingleArg(args);

		return convertToNumber(args[0]);
	}

	/** {@link CCliNumberArgGroup} factory function */
	public static create<Optional extends boolean>(
		options: CCliNumberArgGroupOptions<Optional> = {},
	): CCliNumberArgGroup<Optional> {
		return new CCliNumberArgGroup<Optional>({
			placeholder: '<num>',
			...options,
		});
	}
}
