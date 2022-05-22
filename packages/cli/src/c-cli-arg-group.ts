import { AnyCliDescription } from './c-cli-description';

/** Defines the type of the args passed to an {@link CliArgGroup}
 * @typeParam TRequired If `true`, the `args` parameter might be `undefined` */
export type CCliArgGroupArgs<Required extends boolean> = Required extends true
	? string[]
	: string[] | undefined;

/** A group of adjacent command-line arguments
 * @param Value Type of the value returned by {@link CCliArgGroup.parse}
 * @param Required If `true`, the type of `args` passed to
 * {@link CCliArgGroup.parse} does not include `undefined`. */
export type CCliArgGroup<
	Value = unknown,
	Required extends boolean = boolean,
> = {
	/**
	 * Function or async function that parses a well-typed value from string
	 * arguments */
	parse:
		| ((args: CCliArgGroupArgs<Required>) => Value)
		| ((args: CCliArgGroupArgs<Required>) => Promise<Value>);

	/**
	 * A short placeholder for this argument group in command-line usage e.g.
	 * "\<str\>"
	 * */
	placeholder: string;

	/** A text description of this argument group. Paragraphs are re-wrapped when
	 * printed to the terminal so don't worry about whitespace. */
	description?: AnyCliDescription;

	/**
	 * If `true`, command-line usage will not normally show this arg group
	 * */
	hidden?: boolean;

	/**
	 * If `true`, throw a {@link CliUsageError} if no argument is provided for this
	 * group
	 * */
	required?: Required;

	/**
	 * Experimental support for autocompletion
	 * @hidden true
	 */
	_suggest?: (args: string[], search?: string) => string[];
};

export type ValueFromCCliArgGroup<ArgGroup> = ArgGroup extends CCliArgGroup<
	infer Value
>
	? Value
	: never;
