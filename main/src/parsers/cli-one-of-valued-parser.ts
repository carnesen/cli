import { ICliParser } from '../cli-parser';
import { CliUsageError } from '../cli-usage-error';

/**
 * Options for [[`CliOneOfValuedParser`]]
 * @typeParam TValues Type of the "values" option
 */
export interface ICliOneOfValuedParserOptions<TValues extends string[]> {
	/** Allowed values for this argument. For strict typing do e.g. `['foo' as const]` */
	values: TValues;

	/** [[`ICliParser.required`]] */
	required?: boolean;

	/** [[`ICliParser.description`]] with "Allowed values: ..." appended automatically
	 * */
	description?: string;

	/** [[`ICliParser.placeholder`]] defaulting to "\<value\>" */
	placeholder?: string;

	/** [[`ICliParser.hidden`]] */
	hidden?: boolean;
}

/**
 * A factory for required [[`ICliParser`]]s whose value is one of the values
 * provided
 * @typeParam TValues Type of the provided values
 * */
function CliOneOfValuedParser<TValues extends string[]>(
	options: ICliOneOfValuedParserOptions<TValues> & { required: true },
): ICliParser<TValues[number], true>;

/**
 * A factory for optional [[`ICliParser`]]s whose value is one of the values
 * provided
 * @typeParam TValues Type of the provided values
 * */
function CliOneOfValuedParser<TValues extends string[]>(
	options: ICliOneOfValuedParserOptions<TValues>,
): ICliParser<TValues[number] | undefined, false>;

// Implementation
function CliOneOfValuedParser(
	config: ICliOneOfValuedParserOptions<string[]>,
): ICliParser<string | undefined> {
	const valuesString = config.values.join(', ');
	const {
		required = false,
		description,
		placeholder = '<value>',
		hidden = false,
	} = config;

	const parser: ICliParser<string | undefined> = {
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
	};
	return parser;
}

export { CliOneOfValuedParser };
