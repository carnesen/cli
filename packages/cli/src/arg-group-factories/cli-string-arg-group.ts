import { CliArgGroup } from '../cli-arg-group';
import { CliUsageError } from '../cli-usage-error';

/** Options for [[`CliStringArgGroup`]] */
export type CliStringArgGroupOptions = {
	/** See [[`CliArgGroup.required`]] */
	required?: boolean;

	/** See [[`CliArgGroup.description`]] */
	description?: string;

	/** See [[`CliArgGroup.hidden`]] */
	hidden?: boolean;

	/** See [[`CliArgGroup.placeholder`]] defaulting to "\<str\>" */
	placeholder?: string;
};

/** A factory for required `string`-valued [[`CliArgGroup`]]s */
function CliStringArgGroup(
	options: CliStringArgGroupOptions & { required: true },
): CliArgGroup<string, true>;

/** A factory for optional `string | undefined`-valued [[`CliArgGroup`]]s */
function CliStringArgGroup(
	options?: CliStringArgGroupOptions,
): CliArgGroup<string | undefined, false>;

// Implementation
function CliStringArgGroup(
	options: CliStringArgGroupOptions = {},
): CliArgGroup<string | undefined> {
	const {
		required = false,
		description,
		placeholder = '<str>',
		hidden = false,
	} = options;
	const argGroup: CliArgGroup<string | undefined> = {
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
