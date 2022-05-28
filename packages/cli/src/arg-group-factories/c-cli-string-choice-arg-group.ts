import {
	CCliArgGroup,
	CCliArgGroupOptions,
	CCliParseArgs,
} from '../c-cli-arg-group';
import { renderCCliDescription } from '../c-cli-description';
import { CCliUsageError } from '../c-cli-usage-error';

export type CCliAnyStringChoices = string[] | readonly string[];

/** Options for {@link CliStringChoiceArgGroup}
 * @param Choices Type of the "choices" option */
export type CCliStringChoiceArgGroupOptions<
	Required extends boolean,
	Choices extends CCliAnyStringChoices,
> = CCliArgGroupOptions<Required> & {
	/** Choices for this argument. For strict typing do e.g.
	 * ```
	 * choices: ['foo', 'bar'] as const
	 * ``` */
	choices: Choices;
};

function choicesToString(choices: CCliAnyStringChoices): string {
	return choices.join(', ');
}

export type CCliStringChoiceArgGroupValue<
	Required extends boolean,
	Choices extends CCliAnyStringChoices,
> = Required extends true ? Choices[number] : Choices[number] | undefined;

/** A factory for command argument groups whose value is one of the choices
 * provided */

export class CCliStringChoiceArgGroup<
	Required extends boolean,
	Choices extends CCliAnyStringChoices,
> extends CCliArgGroup<
	CCliStringChoiceArgGroupValue<Required, Choices>,
	Required
> {
	protected constructor(
		public readonly options: CCliStringChoiceArgGroupOptions<Required, Choices>,
	) {
		super(options);
	}

	public parse(
		args: CCliParseArgs<Required>,
	): CCliStringChoiceArgGroupValue<Required, Choices> {
		if (!args) {
			return this.undefinedAsValue();
		}

		if (args.length !== 1) {
			throw new CCliUsageError(
				`Expected ${this.options.placeholder} to be one of ${choicesToString(
					this.options.choices,
				)}`,
			);
		}

		const arg = args[0];
		this.assertOneOfChoices(arg);
		return arg;
	}

	private assertOneOfChoices(arg: string): asserts arg is Choices[number] {
		if (!this.options.choices.includes(arg)) {
			throw new CCliUsageError(
				`Invalid argument "${arg}". Expected ${
					this.options.placeholder
				} to be one of ${choicesToString(this.options.choices)}`,
			);
		}
	}

	public _suggest(args: string[]): string[] {
		if (args.length > 0) {
			return [];
		}
		return this.options.choices as string[];
	}

	public static create<
		Required extends boolean,
		Choices extends CCliAnyStringChoices,
	>(
		options: CCliStringChoiceArgGroupOptions<Required, Choices>,
	): CCliStringChoiceArgGroup<Required, Choices> {
		const valuesString = choicesToString(options.choices);

		return new CCliStringChoiceArgGroup<Required, Choices>({
			placeholder: '<value>',
			...options,
			description(input) {
				let text = renderCCliDescription(options.description, input);
				if (text.length > 0) {
					text += '\n\n';
				}
				text += `Choices: ${valuesString}`;
				return text;
			},
		});
	}
}
