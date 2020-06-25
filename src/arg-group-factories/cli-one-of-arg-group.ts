import { ICliArgGroup } from '../cli-arg-group';
import { CliUsageError } from '../cli-usage-error';

/**
 * Options for [[`CliOneOfArgGroup`]]
 * @typeParam TValues Type of the "values" option
 */
export interface ICliOneOfArgGroupOptions<TValues extends string[]> {
	/** Allowed values for this argument. For strict typing do e.g. `['foo' as const]` */
	values: TValues;

	/** [[`ICliArgGroup.required`]] */
	required?: boolean;

	/** [[`ICliArgGroup.description`]] with "Allowed values: ..." appended automatically
	 * */
	description?: string;

	/** [[`ICliArgGroup.placeholder`]] defaulting to "\<value\>" */
	placeholder?: string;

	/** [[`ICliArgGroup.hidden`]] */
	hidden?: boolean;
}

/**
 * A factory for required [[`ICliArgGroup`]]s whose value is one of the values
 * provided
 * @typeParam TValues Type of the provided values
 * */
function CliOneOfArgGroup<TValues extends string[]>(
	options: ICliOneOfArgGroupOptions<TValues> & { required: true },
): ICliArgGroup<TValues[number], true>;

/**
 * A factory for optional [[`ICliArgGroup`]]s whose value is one of the values
 * provided
 * @typeParam TValues Type of the provided values
 * */
function CliOneOfArgGroup<TValues extends string[]>(
	options: ICliOneOfArgGroupOptions<TValues>,
): ICliArgGroup<TValues[number] | undefined, false>;

// Implementation
function CliOneOfArgGroup(
	config: ICliOneOfArgGroupOptions<string[]>,
): ICliArgGroup<string | undefined> {
	const valuesString = config.values.join(', ');
	const {
		required = false,
		description,
		placeholder = '<value>',
		hidden = false,
	} = config;

	const argGroup: ICliArgGroup<string | undefined> = {
		required,
		placeholder: config.placeholder || '<value>',
		hidden,
		parse(args) {
			if (!args) {
				return undefined;
			}

			if (args.length !== 1) {
				throw new CliUsageError(
					`Expected ${placeholder} to be one of ${valuesString}`,
				);
			}

			if (!config.values.includes(args[0])) {
				throw new CliUsageError(
					`Invalid argument "${args[0]}". Expected ${placeholder} to be one of ${valuesString}`,
				);
			}
			return args[0];
		},
		description: `${description || ''}\n\nAllowed values: ${valuesString}`,
		_suggest(args) {
			if (args.length > 0) {
				return [];
			}
			return config.values;
		},
	};
	return argGroup;
}

export { CliOneOfArgGroup };
