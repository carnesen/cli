import { ICliArgGroup } from '../cli-arg-group';
import { CliUsageError } from '../cli-usage-error';

export type CliStringChoices = string[] | readonly string[];

/**
 * Options for [[`CliStringChoiceArgGroup`]]
 * @typeParam TChoices Type of the "choices" option
 */
export interface ICliStringChoiceArgGroupOptions<
	TChoices extends CliStringChoices,
> {
	/**
	 * Choices for this argument. For strict typing do e.g.
	 *
	 * choices: ['foo', 'bar'] as const
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
 * A factory for [[`ICliArgGroup`]]s whose value is one of the choices provided
 * @typeParam TChoices Type of the provided choices.
 * */

// required = true overload
function CliStringChoiceArgGroup<TChoices extends CliStringChoices>(
	options: ICliStringChoiceArgGroupOptions<TChoices> & { required: true },
): ICliArgGroup<TChoices[number], true>;

// required = false overload
function CliStringChoiceArgGroup<TChoices extends CliStringChoices>(
	options: ICliStringChoiceArgGroupOptions<TChoices>,
): ICliArgGroup<TChoices[number] | undefined, false>;

// Implementation
function CliStringChoiceArgGroup(
	options: ICliStringChoiceArgGroupOptions<CliStringChoices>,
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
			return options.choices as string[];
		},
	};
	return argGroup;
}

export { CliStringChoiceArgGroup };
