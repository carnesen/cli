import { TCliDescription } from './cli-description';

/**
 * Defines the type of the args passed to an [[`ICliArgGroup`]]
 * @typeParam TRequired If `true`, the `args` parameter might be `undefined`
 */
export type TCliArgGroupArgs<TRequired extends boolean> = TRequired extends true
	? string[]
	: string[] | undefined;

/**
 * A group of adjacent command-line arguments
 * @typeParam TValue Type of the value returned by [[`ICliArgGroup.parse`]]
 * @typeParam TRequired If `true`, the type of `args` passed to
 * [[`ICliArgGroup.parse`]] does not include `undefined`.
 */
export interface ICliArgGroup<
	TValue = unknown,
	TRequired extends boolean = boolean
> {
	/**
	 * Function or async function that parses a well-typed value from string
	 * arguments */
	parse:
		| ((args: TCliArgGroupArgs<TRequired>) => TValue)
		| ((args: TCliArgGroupArgs<TRequired>) => Promise<TValue>);

	/**
	 * A short placeholder for this argument group in command-line usage e.g.
	 * "\<str\>"
	 * */
	placeholder: string;

	/** A text description of this argument group. Paragraphs are re-wrapped when
	 * printed to the terminal so don't worry about whitespace. */
	description?: TCliDescription;

	/**
	 * If `true`, command-line usage will not normally show this arg group
	 * */
	hidden?: boolean;

	/**
	 * If `true`, throw a [[`CliUsageError`]] if no argument is provided for this
	 * group
	 * */
	required?: TRequired;

	/**
	 * Experimental support for autocompletion
	 * @hidden true
	 */
	_suggest?: (args: string[], search?: string) => string[];
}

export type TValueFromCliArgGroup<TArgGroup> = TArgGroup extends ICliArgGroup<
	infer TValue
>
	? TValue
	: never;
