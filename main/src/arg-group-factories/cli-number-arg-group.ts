import { ICliArgGroup } from '../cli-arg-group';
import { convertToNumber } from '../util';
import { CliUsageError } from '../cli-usage-error';

/** Options for [[`CliNumberArgGroup`]] */
export interface ICliNumberArgGroupOptions {
	/** See [[`ICliArgGroup.required`]] */
	required?: boolean;

	/** See [[`ICliArgGroup.description`]] */
	description?: string;

	/** See [[`ICliArgGroup.placeholder`]] defaulting to "\<num\>" */
	placeholder?: string;

	/** See [[`ICliArgGroup.description`]] */
	hidden?: boolean;
}

/** A factory for `number`-valued required [[`ICliArgGroup`]]s */
function CliNumberArgGroup(
	options: ICliNumberArgGroupOptions & { required: true },
): ICliArgGroup<number, true>;

/** A factory for `number | undefined`-valued optional [[`ICliArgGroup`]]s */
function CliNumberArgGroup(
	options?: ICliNumberArgGroupOptions,
): ICliArgGroup<number | undefined, boolean>;

// Implementation
function CliNumberArgGroup(
	config: ICliNumberArgGroupOptions = {},
): ICliArgGroup<number | undefined> {
	const {
		required = false,
		description,
		placeholder = '<num>',
		hidden = false,
	} = config;
	const argGroup: ICliArgGroup<number | undefined> = {
		required,
		hidden,
		parse(args) {
			if (!args) {
				return undefined;
			}

			if (args.length > 1) {
				throw new CliUsageError(`Expected just one ${placeholder}`);
			}

			if (args.length === 0) {
				throw new CliUsageError(`Expected a ${placeholder}`);
			}

			return convertToNumber(args[0]);
		},
		description,
		placeholder,
	};
	return argGroup;
}

export { CliNumberArgGroup };
