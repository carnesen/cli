import { ICliArgGroup } from '../cli-arg-group';
import { CliUsageError } from '../cli-usage-error';

/**
 * Options for [[`CliStringChoiceArgGroup`]]
 * @typeParam TChoices Type of the "choices" option
 */
export interface ICliStringChoiceArgGroupOptions<TChoices extends string[]> {
	/**
	 * Choices for this argument. For strict typing do e.g.
	 *
	 * choices: ['foo' as const, 'bar' as const]
	 *
	 * */
	choices: TChoices;

	/** See [[`ICliArgGroup.required`]] */
	required?: boolean;

	/** See [[`ICliArgGroup.description`]] with "Choices: ..." appended automatically
	 * */
	description?: string;

	/** See [[`ICliArgGroup.placeholder`]] defaulting to "\<value\>" */
	placeholder?: string;

	/** See [[`ICliArgGroup.hidden`]] */
	hidden?: boolean;
}

/**
 * A factory for required [[`ICliArgGroup`]]s whose value is one of the choices
 * provided
 * @typeParam TChoices Type of the provided choices
 * */
function CliStringChoiceArgGroup<TChoices extends string[]>(
	options: ICliStringChoiceArgGroupOptions<TChoices> & { required: true },
): ICliArgGroup<TChoices[number], true>;

/**
 * A factory for optional [[`ICliArgGroup`]]s whose value is one of the choices
 * provided
 * @typeParam TChoices Type of the provided choices
 * */
function CliStringChoiceArgGroup<TChoices extends string[]>(
	options: ICliStringChoiceArgGroupOptions<TChoices>,
): ICliArgGroup<TChoices[number] | undefined, false>;

// Implementation
function CliStringChoiceArgGroup(
	options: ICliStringChoiceArgGroupOptions<string[]>,
): ICliArgGroup<string | undefined> {
	const valuesString = options.choices.join(', ');
	const {
		required = false,
		description,
		placeholder = '<value>',
		hidden = false,
	} = options;

	const argGroup: ICliArgGroup<string | undefined> = {
		required,
		placeholder: options.placeholder || '<value>',
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

			if (!options.choices.includes(args[0])) {
				throw new CliUsageError(
					`Invalid argument "${args[0]}". Expected ${placeholder} to be one of ${valuesString}`,
				);
			}
			return args[0];
		},
		description: `${description || ''}\n\nChoices: ${valuesString}`,
		_suggest(args) {
			if (args.length > 0) {
				return [];
			}
			return options.choices;
		},
	};
	return argGroup;
}

export { CliStringChoiceArgGroup };
