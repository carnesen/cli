import { CCliAnyDescription } from './c-cli-description';
import { CCliUsageError } from './c-cli-usage-error';

/**
 * Defines the type of the args passed to an {@link CCliAbstractArgGroup.parse}
 * @param Required If `false` `undefined`, `undefined` */
export type CCliParseArgs<Required extends boolean = boolean> =
	Required extends true ? string[] : string[] | undefined;

/** Options for creating an argument group, a group of adjacent command-line
 * arguments
 * @param Required If `true`, the type of `args` passed to
 * {@link CCliArgGroupOptions.parse} does not include `undefined`. */
export type CCliArgGroupOptions<Required extends boolean = boolean> = {
	/** A text description of this argument group. Paragraphs are re-wrapped when
	 * printed to the terminal so don't worry about whitespace. */
	description?: CCliAnyDescription;

	/** If `true`, command-line usage won't show this arg group unless it's
	 * invoked directly */
	hidden?: boolean;

	/** A short placeholder for this argument group in command-line usage. By
	 * convention, **@carnesen/cli** placeholders are wrapped in angled brackets
	 * e.g. `"<email>"` */
	placeholder?: string;

	/** If `true`, throw a {@link CCliUsageError} if no argument is provided for
	 * this group */
	required?: Required;
};

export type ValueFromCCliArgGroup<ArgGroup> =
	ArgGroup extends CCliAbstractArgGroup<infer Value> ? Value : never;

/** A group of adjacent command-line arguments
 * @param Value Type of the value returned by {@link CCliArgGroupOptions.parse}
 * @param Required If `true`, the type of `args` passed to
 * {@link CCliAbstractArgGroup.parse} does not include `undefined`. */
export abstract class CCliAbstractArgGroup<
	Value = unknown,
	Required extends boolean = boolean,
> {
	protected constructor(
		public readonly options: CCliArgGroupOptions<Required>,
	) {
		this.parse = this.parse.bind(this);
	}

	/** Function that parses a well-typed value from string arguments */
	public abstract parse(args: CCliParseArgs<Required>): Value;

	/** Experimental support for autocompletion. Implemented by subclass. */
	public _suggest(_args: string[], _search?: string): string[] {
		return [];
	}

	protected assertSingleArg(args: unknown[]): void {
		if (args.length !== 1) {
			throw new CCliUsageError(`Expected a single ${this.options.placeholder}`);
		}
	}

	public assertOneOrMoreArgs(args: unknown[]): void {
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
