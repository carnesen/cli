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

	/** A sentence or two describing this argument group for command-line usage */
	description?: string;

	/**
	 * If `true`, command-line usage will not normally show this arg group.
	 * */
	hidden?: boolean;

	/**
	 * If `true` a [[`CliUsageError`]] is thrown if no arg is provided for this
	 * group.
	 * */
	required?: TRequired;
}

export type TValueFromCliArgGroup<TArgGroup> = TArgGroup extends ICliArgGroup<
	infer TValue
>
	? TValue
	: never;
