import { ICliArgParser } from '../cli-arg-parser';
export declare type CliFlagArgParserOptions = {
    description?: string;
    hidden?: boolean;
};
/**
 * A factory for command-line flag arg parsers
 *
 * @param options
 * If `options.hidden`, do not show in usage.
 *
 * @returns
 * A boolean-valued optional ArgParser
 *
 * @example
 * ```plaintext
 * $ cli           // named flag "foo" parses `false`
 * $ cli --foo     // named flag "foo" parses `true`
 * $ cli --foo bar // usage error
 * ```
 *
 * @throws {@linkcode CliUsageError}
 */
export declare function CliFlagArgParser(options?: CliFlagArgParserOptions): ICliArgParser<boolean, false>;
//# sourceMappingURL=cli-flag-arg-parser.d.ts.map