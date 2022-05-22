import { CCliArgGroup } from '../c-cli-arg-group';
import { CCliUsageError } from '../c-cli-usage-error';

export type AnyCliStringChoices = string[] | readonly string[];

/** Options for {@link CliStringChoiceArgGroup}
 * @typeParam TChoices Type of the "choices" option */
export type CliStringChoiceArgGroupOptions<
	Choices extends AnyCliStringChoices,
> = {
	/** Choices for this argument. For strict typing do e.g.
	 * ```
	 * choices: ['foo', 'bar'] as const
	 * ``` */
	choices: Choices;

	/** See {@link CliArgGroup.required} */
	required?: boolean;

	/** See {@link CliArgGroup.description} with "Choices: ..." appended
	 * automatically */
	description?: string;

	/** See {@link CliArgGroup.placeholder} defaulting to "\<value\>" */
	placeholder?: string;

	/** See {@link CliArgGroup.hidden} */
	hidden?: boolean;
};

/** A factory for command argument groups whose value is one of the choices
 * provided */

// required = true overload
function CliStringChoiceArgGroup<Choices extends AnyCliStringChoices>(
	options: CliStringChoiceArgGroupOptions<Choices> & { required: true },
): CCliArgGroup<Choices[number], true>;

// required = false overload
function CliStringChoiceArgGroup<Choices extends AnyCliStringChoices>(
	options: CliStringChoiceArgGroupOptions<Choices>,
): CCliArgGroup<Choices[number] | undefined, false>;

// Implementation
function CliStringChoiceArgGroup(
	options: CliStringChoiceArgGroupOptions<AnyCliStringChoices>,
): CCliArgGroup<string | undefined> {
	const valuesString = options.choices.join(', ');
	const {
		required = false,
		description,
		placeholder = '<value>',
		hidden = false,
	} = options;

	const argGroup: CCliArgGroup<string | undefined> = {
		required,
		placeholder: options.placeholder || '<value>',
		hidden,
		parse(args) {
			if (!args) {
				return undefined;
			}

			if (args.length !== 1) {
				throw new CCliUsageError(
					`Expected ${placeholder} to be one of ${valuesString}`,
				);
			}

			if (!options.choices.includes(args[0])) {
				throw new CCliUsageError(
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
