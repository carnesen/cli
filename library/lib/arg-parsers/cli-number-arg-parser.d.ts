import { ICliArgParser } from '../cli-arg-parser';
/**
 * Type of {@linkcode CliNumberArgParser}'s `options` parameter
 */
export declare type CliNumberArgParserOptions = {
    required?: boolean;
    description?: string;
    defaultValue?: number;
    /**
     * Defaults to <num>
     */
    placeholder?: string;
    hidden?: boolean;
};
/**
 * A factory function for creating number-valued arg parsers
 * @param options
 * @returns A number-valued arg parser
 */
declare function CliNumberArgParser(options: CliNumberArgParserOptions & {
    defaultValue: number;
}): ICliArgParser<number, false>;
declare function CliNumberArgParser(config: CliNumberArgParserOptions & {
    required: true;
}): ICliArgParser<number, true>;
declare function CliNumberArgParser(config?: CliNumberArgParserOptions): ICliArgParser<number | undefined, boolean>;
export { CliNumberArgParser };
//# sourceMappingURL=cli-number-arg-parser.d.ts.map