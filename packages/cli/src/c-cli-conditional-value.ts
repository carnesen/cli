/** Generic type helper for adding `| undefined` to the parsed value type when
 * an argument group is optional */
export type CCliConditionalValue<
	Value,
	Optional extends boolean,
> = Optional extends true ? Value | undefined : Value;
