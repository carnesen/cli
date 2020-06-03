import { ICliArgParser } from '../cli-arg-parser';
/**
 * The type of {@linkcode CliStringArgParser}'s options parameter
 */
export declare type CliStringArgParserOptions = Partial<{
    required: boolean;
    description: string;
    defaultValue: string;
    hidden: boolean;
    placeholder: string;
}>;
/**
 * A factory for string-valued arg parsers
 *
 * @param options - An object of optional properties
 * @returns A string-valued arg parser
 */
declare function CliStringArgParser(options: CliStringArgParserOptions & {
    defaultValue: string;
}): ICliArgParser<string, false>;
declare function CliStringArgParser(options: CliStringArgParserOptions & {
    required: true;
}): ICliArgParser<string, true>;
declare function CliStringArgParser(options?: CliStringArgParserOptions): ICliArgParser<string | undefined, false>;
export { CliStringArgParser };
//# sourceMappingURL=cli-string-arg-parser.d.ts.map