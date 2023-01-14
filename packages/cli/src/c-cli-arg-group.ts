import { CCliDescription } from './c-cli-description';
import { CCliUsageError } from './c-cli-usage-error';
import { CCliConditionalValue } from './c-cli-conditional-value';

/** Defines the type of the args passed to an {@link CCliArgGroup.parse} */
export type CCliParseArgs<Optional extends boolean> = CCliConditionalValue<
	string[],
	Optional
>;

/** Options for creating an argument group, a group of adjacent command-line
 * arguments
 * @typeParam Optional If `true`, the type of `args` passed to
 * {@link CCliArgGroupOptions.parse} does not include `undefined`. */
export type CCliArgGroupOptions<Optional extends boolean> = {
	/** A text description of this argument group. Paragraphs are re-wrapped when
	 * printed to the terminal so don't worry about whitespace. */
	description?: CCliDescription;

	/** If `true`, command-line usage won't show this arg group unless it's
	 * invoked directly */
	hidden?: boolean;

	/** A short placeholder for this argument group in command-line usage. By
	 * convention, **@carnesen/cli** placeholders are wrapped in angled brackets
	 * e.g. `"<email>"` */
	placeholder?: string;

	/** Unless `true`, a {@link CCliUsageError} thrown if no argument is provided
	 * for this argument group */
	optional?: Optional;
};

export type InferParsedValueFromCCliArgGroup<ArgGroup> =
	ArgGroup extends CCliArgGroup<infer Value, true>
		? Value | undefined
		: ArgGroup extends CCliArgGroup<infer Value>
		? NonNullable<Value>
		: never;

/** A group of consecutive command-line arguments parsed together into a single
 * well-typed value
 * @param Value Type of the value returned by {@link CCliArgGroup.parse}
 * @param Optional If `true`, the type of `args` passed to
 * {@link CCliArgGroup.parse} includes `undefined`. */
export abstract class CCliArgGroup<
	Value = unknown,
	Optional extends boolean = boolean,
> {
	protected constructor(
		protected readonly options: CCliArgGroupOptions<Optional>,
	) {
		this.parse = this.parse.bind(this);
	}

	public get description(): CCliDescription {
		return this.options.description;
	}

	public get hidden(): boolean {
		return this.options.hidden || false;
	}

	public get placeholder(): string {
		return this.options.placeholder ?? '<val>';
	}

	public get optional(): boolean {
		return Boolean(this.options.optional);
	}

	/** Function that parses a well-typed value from string arguments */
	public abstract parse(
		args: CCliParseArgs<Optional>,
	): CCliConditionalValue<Value, Optional>;

	/** Experimental support for autocompletion. Optionally implemented by
	 * subclass. */
	public _suggest(_args: string[], _search?: string): string[] {
		return [];
	}

	protected assertSingleArg(args: unknown[]): void {
		if (args.length !== 1) {
			throw new CCliUsageError(`Expected a single ${this.options.placeholder}`);
		}
	}

	protected assertOneOrMoreArgs(args: unknown[]): void {
		if (args.length === 0) {
			throw new CCliUsageError(
				`Expected one or more arguments ${this.options.placeholder}`,
			);
		}
	}

	public undefinedAsValue(): Value {
		return undefined as unknown as Value;
	}
}
