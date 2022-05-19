import { CliArgGroup } from '../cli-arg-group';
import { convertToNumber } from '../util';
import { CliUsageError } from '../cli-usage-error';

/** Options for [[`CliNumberArgGroup`]] */
export type CliNumberArgGroupOptions = {
	/** See [[`CliArgGroup.required`]] */
	required?: boolean;

	/** See [[`CliArgGroup.description`]] */
	description?: string;

	/** See [[`CliArgGroup.placeholder`]] defaulting to "\<num\>" */
	placeholder?: string;

	/** See [[`CliArgGroup.description`]] */
	hidden?: boolean;
};

/** A factory for `number`-valued required [[`CliArgGroup`]]s */
function CliNumberArgGroup(
	options: CliNumberArgGroupOptions & { required: true },
): CliArgGroup<number, true>;

/** A factory for `number | undefined`-valued optional [[`CliArgGroup`]]s */
function CliNumberArgGroup(
	options?: CliNumberArgGroupOptions,
): CliArgGroup<number | undefined, boolean>;

// Implementation
function CliNumberArgGroup(
	config: CliNumberArgGroupOptions = {},
): CliArgGroup<number | undefined> {
	const {
		required = false,
		description,
		placeholder = '<num>',
		hidden = false,
	} = config;
	const argGroup: CliArgGroup<number | undefined> = {
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
