import { ICliArgGroup } from '../cli-arg-group';
import { CliUsageError } from '../cli-usage-error';

/** Options for [[`CliStringArrayArgGroup`]] */
export interface ICliStringArrayArgGroupOptions {
	/** [[`ICliArgGroup.description`]] */
	description?: string;

	/** [[`ICliArgGroup.required`]] */
	required?: boolean;

	/** [[`ICliArgGroup.required`]] */
	hidden?: boolean;

	/** [[`ICliArgGroup.placeholder`]] defaulting to "\<str0\> [...]" */
	placeholder?: string;
}

/** A factory for required `string[]`-valued [[`ICliArgGroup`]]s */
function CliStringArrayArgGroup(
	options: ICliStringArrayArgGroupOptions & { required: true },
): ICliArgGroup<string[], true>;

/** A factory for optional `string[] | undefined`-valued [[`ICliArgGroup`]]s */
function CliStringArrayArgGroup(
	options?: ICliStringArrayArgGroupOptions,
): ICliArgGroup<string[] | undefined, boolean>;

// Implementation
function CliStringArrayArgGroup(
	options: ICliStringArrayArgGroupOptions = {},
): ICliArgGroup<string[] | undefined> {
	const {
		required = false,
		description,
		placeholder = '<str0> [...]',
		hidden = false,
	} = options;
	const argGroup: ICliArgGroup<string[] | undefined> = {
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
