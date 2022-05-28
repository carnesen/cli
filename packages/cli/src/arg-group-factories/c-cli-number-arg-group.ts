import {
	CCliArgGroup,
	CCliArgGroupOptions,
	CCliParseArgs,
} from '../c-cli-arg-group';
import { convertToNumber } from '../util';
import { CCliUsageError } from '../c-cli-usage-error';

/** Options for {@link CCliNumberArgGroup} */
export type CCliNumberArgGroupOptions<Required extends boolean> =
	CCliArgGroupOptions<Required>;

export type CCliNumberArgGroupValue<Required extends boolean> =
	Required extends true ? number : number | undefined;

export class CCliNumberArgGroup<Required extends boolean> extends CCliArgGroup<
	CCliNumberArgGroupValue<Required>,
	Required
> {
	public parse(
		args: CCliParseArgs<Required>,
	): CCliNumberArgGroupValue<Required> {
		if (!args) {
			return this.undefinedAsValue();
		}

		this.assertSingleArg(args);
		if (args.length === 0) {
			throw new CCliUsageError(`Expected a ${this.options.placeholder}`);
		}

		return convertToNumber(args[0]);
	}

	/** A factory for `number`-valued required argument groups */
	public static create<Required extends boolean>(
		options: CCliNumberArgGroupOptions<Required> = {},
	): CCliNumberArgGroup<Required> {
		return new CCliNumberArgGroup<Required>({
			placeholder: '<num>',
			...options,
		});
	}
}
