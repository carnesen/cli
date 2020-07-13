import { ICliArgGroup } from '../cli-arg-group';
import { CliUsageError } from '../cli-usage-error';

/** Options for [[`CliStringArgGroup`]] */
export interface ICliStringArgGroupOptions {
	/** See [[`ICliArgGroup.required`]] */
	required?: boolean;

	/** See [[`ICliArgGroup.description`]] */
	description?: string;

	/** See [[`ICliArgGroup.hidden`]] */
	hidden?: boolean;

	/** See [[`ICliArgGroup.placeholder`]] defaulting to "\<str\>" */
	placeholder?: string;
}

/** A factory for required `string`-valued [[`ICliArgGroup`]]s */
function CliStringArgGroup(
	options: ICliStringArgGroupOptions & { required: true },
): ICliArgGroup<string, true>;

/** A factory for optional `string | undefined`-valued [[`ICliArgGroup`]]s */
function CliStringArgGroup(
	options?: ICliStringArgGroupOptions,
): ICliArgGroup<string | undefined, false>;

// Implementation
function CliStringArgGroup(
	options: ICliStringArgGroupOptions = {},
): ICliArgGroup<string | undefined> {
	const {
		required = false,
		description,
		placeholder = '<str>',
		hidden = false,
	} = options;
	const argGroup: ICliArgGroup<string | undefined> = {
		hidden,
		placeholder,
		required,
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

			return args[0];
		},
		description,
	};
	return argGroup;
}

export { CliStringArgGroup };
