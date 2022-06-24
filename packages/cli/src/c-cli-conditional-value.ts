export type CCliConditionalValue<
	Value,
	Optional extends boolean,
> = Optional extends true ? Value | undefined : Value;
