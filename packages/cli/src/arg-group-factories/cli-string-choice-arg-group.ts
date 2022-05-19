import { CliArgGroup } from '../cli-arg-group';
import { CliUsageError } from '../cli-usage-error';

export type AnyCliStringChoices = string[] | readonly string[];

/** Options for [[`CliStringChoiceArgGroup`]]
 * @typeParam TChoices Type of the "choices" option */
export type CliStringChoiceArgGroupOptions<
	Choices extends AnyCliStringChoices,
> = {
	/** Choices for this argument. For strict typing do e.g.
	 * ```
	 * choices: ['foo', 'bar'] as const
	 * ``` */
	choices: Choices;

	/** See [[`CliArgGroup.required`]] */
	required?: boolean;

	/** See [[`CliArgGroup.description`]] with "Choices: ..." appended
	 * automatically */
	description?: string;

	/** See [[`CliArgGroup.placeholder`]] defaulting to "\<value\>" */
	placeholder?: string;

	/** See [[`CliArgGroup.hidden`]] */
	hidden?: boolean;
};

/**
 * A factory for [[`CliArgGroup`]]s whose value is one of the choices provided
 * @typeParam TChoices Type of the provided choices.
 * */

// required = true overload
function CliStringChoiceArgGroup<TChoices extends AnyCliStringChoices>(
	options: CliStringChoiceArgGroupOptions<TChoices> & { required: true },
): CliArgGroup<TChoices[number], true>;

// required = false overload
function CliStringChoiceArgGroup<TChoices extends AnyCliStringChoices>(
	options: CliStringChoiceArgGroupOptions<TChoices>,
): CliArgGroup<TChoices[number] | undefined, false>;

// Implementation
function CliStringChoiceArgGroup(
	options: CliStringChoiceArgGroupOptions<AnyCliStringChoices>,
): CliArgGroup<string | undefined> {
	const valuesString = options.choices.join(', ');
	const {
		required = false,
		description,
		placeholder = '<value>',
		hidden = false,
	} = options;

	const argGroup: CliArgGroup<string | undefined> = {
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
