/**
 * Defines the type of the args passed to an [[`ICliArgGroup`]]
 * @typeParam TRequired If `true`, the `args` parameter might be `undefined`
 */
export type TCliArgGroupArgs<TRequired extends boolean> = TRequired extends true
	? string[]
	: string[] | undefined;

/**
 * An object for parsing a well-typed value from string arguments
 * @typeParam TValue Type of the parsed value
 * @typeParam TRequired If `true`, the argGroup won't receive `undefined`
 */
export interface ICliArgGroup<
	TValue extends any,
	TRequired extends boolean = boolean
> {
	/** Function or async function that parses a well-typed value from string arguments */
	parse:
		| ((args: TCliArgGroupArgs<TRequired>) => TValue)
		| ((args: TCliArgGroupArgs<TRequired>) => Promise<TValue>);

	/** A short placeholder for this argument in command-line usage e.g. "\<str\>"
	 * */
	placeholder: string;

	/** A sentence or two describing this argument for command-line usage */
	description?: string;

	/** If true, the CLI will not show this argGroup in command-line usage */
	hidden?: boolean;

	/** A [[`CliUsageError`]] is thrown if a required argument is not provided */
	required?: TRequired;
}

export type AnyArgGroup = ICliArgGroup<any>;

export type TValueFromCliArgGroup<TArgGroup> = TArgGroup extends ICliArgGroup<
	infer TValue,
	any
>
	? TValue
	: never;

export type AnyNamedArgGroups = {
	[name: string]: AnyArgGroup;
};

export type NamedValues<TNamedArgGroups extends AnyNamedArgGroups> = {
	[K in keyof TNamedArgGroups]: TValueFromCliArgGroup<TNamedArgGroups[K]>;
};
