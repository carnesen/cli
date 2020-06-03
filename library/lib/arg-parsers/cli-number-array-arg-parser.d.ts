import { ICliArgParser } from '../cli-arg-parser';
/**
 * Type of {@linkcode CliNumberArrayArgParser}'s `options` parameter
 */
export declare type CliNumberArrayArgParserOptions = {
    description?: string;
    required?: boolean;
    placeholder?: string;
    hidden?: boolean;
};
/**
 * A factory function for creating number-array-valued arg parsers
 * @param options
 * @returns A number-array-valued arg parser
 */
declare function CliNumberArrayArgParser(config: CliNumberArrayArgParserOptions & {
    required: true;
}): ICliArgParser<number[], true>;
declare function CliNumberArrayArgParser(config?: CliNumberArrayArgParserOptions): ICliArgParser<number[] | undefined, boolean>;
export { CliNumberArrayArgParser };
//# sourceMappingURL=cli-number-array-arg-parser.d.ts.map