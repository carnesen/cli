import {
	CCliArgGroup,
	CCliArgGroupOptions,
	CCliParseArgs,
} from '../c-cli-arg-group';
import { renderCCliDescription } from '../c-cli-description';
import { CCliUsageError } from '../c-cli-usage-error';
import { CCliConditionalValue } from '../c-cli-conditional-value';

export type CCliAnyStringChoices = string[] | readonly string[];

/** Options for a {@link CCliStringChoiceArgGroup}
 * @typeParam If true, a value need not be provided
 * @typeParam Choices Type of the "choices" option */
export type CCliStringChoiceArgGroupOptions<
	Optional extends boolean,
	Choices extends CCliAnyStringChoices,
> = CCliArgGroupOptions<Optional> & {
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
	Optional extends boolean,
	Choices extends CCliAnyStringChoices,
> = CCliConditionalValue<Choices[number], Optional>;

/** Command-line argument group whose value is one of the choices provided */
export class CCliStringChoiceArgGroup<
	Optional extends boolean,
	Choices extends CCliAnyStringChoices,
> extends CCliArgGroup<
	CCliStringChoiceArgGroupValue<Optional, Choices>,
	Optional
> {
	protected constructor(
		public readonly options: CCliStringChoiceArgGroupOptions<Optional, Choices>,
	) {
		super(options);
	}

	public parse(
		args: CCliParseArgs<Optional>,
	): CCliStringChoiceArgGroupValue<Optional, Choices> {
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

	/** {@link CCliStringChoiceArgGroup} factory function */
	public static create<
		Optional extends boolean,
		Choices extends CCliAnyStringChoices,
	>(
		options: CCliStringChoiceArgGroupOptions<Optional, Choices>,
	): CCliStringChoiceArgGroup<Optional, Choices> {
		const valuesString = choicesToString(options.choices);

		return new CCliStringChoiceArgGroup<Optional, Choices>({
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
