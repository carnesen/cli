import { ICliArgParser } from '../cli-arg-parser';
/**
 * Type of {@linkcode CliOneOfArgParser}'s `options` parameter
 * @typeParam TValues Type of the required property "values" and `parse`'s return value
 */
export declare type CliOneOfArgParserOptions<TValues extends string[]> = {
    /**
     * Array enumerating the allowed values for this argument
     */
    values: TValues;
    required?: boolean;
    description?: string;
    placeholder?: string;
    hidden?: boolean;
};
/**
 * A factory function for creating number-array-valued arg parsers
 * @param options
 * @returns A number-array-valued arg parser
 */
declare function CliOneOfArgParser<TValues extends string[]>(options: CliOneOfArgParserOptions<TValues> & {
    defaultValue: TValues;
}): ICliArgParser<TValues[number], false>;
declare function CliOneOfArgParser<TValues extends string[]>(options: CliOneOfArgParserOptions<TValues> & {
    required: true;
}): ICliArgParser<TValues[number], true>;
declare function CliOneOfArgParser<TValues extends string[]>(options: CliOneOfArgParserOptions<TValues>): ICliArgParser<TValues[number] | undefined, false>;
export { CliOneOfArgParser };
//# sourceMappingURL=cli-one-of-arg-parser.d.ts.map