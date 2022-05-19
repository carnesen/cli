import { CliArgGroup } from '../cli-arg-group';
import { CliUsageError } from '../cli-usage-error';

/** Options for [[`CliStringArrayArgGroup`]] */
export type CliStringArrayArgGroupOptions = {
	/** See [[`CliArgGroup.description`]] */
	description?: string;

	/** See [[`CliArgGroup.required`]] */
	required?: boolean;

	/** See [[`CliArgGroup.required`]] */
	hidden?: boolean;

	/** See [[`CliArgGroup.placeholder`]] defaulting to "\<str0\> [...]" */
	placeholder?: string;
};

/** A factory for required `string[]`-valued [[`CliArgGroup`]]s */
function CliStringArrayArgGroup(
	options: CliStringArrayArgGroupOptions & { required: true },
): CliArgGroup<string[], true>;

/** A factory for optional `string[] | undefined`-valued [[`CliArgGroup`]]s */
function CliStringArrayArgGroup(
	options?: CliStringArrayArgGroupOptions,
): CliArgGroup<string[] | undefined, boolean>;

// Implementation
function CliStringArrayArgGroup(
	options: CliStringArrayArgGroupOptions = {},
): CliArgGroup<string[] | undefined> {
	const {
		required = false,
		description,
		placeholder = '<str0> [...]',
		hidden = false,
	} = options;
	const argGroup: CliArgGroup<string[] | undefined> = {
		required,
		hidden,
		placeholder,
		parse(args) {
			if (!args) {
				return undefined;
			}

			if (args.length === 0) {
				throw new CliUsageError(`Expected one or more values ${placeholder}`);
			}

			return args;
		},
		description,
	};
	return argGroup;
}

export { CliStringArrayArgGroup };
