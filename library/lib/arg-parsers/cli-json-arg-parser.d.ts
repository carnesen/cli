import { ICliArgParser } from '../cli-arg-parser';
export declare type CliJsonArgParserOptions = {
    description?: string;
    required?: boolean;
    /**
     * Defaults to <json>
     */
    placeholder?: string;
    hidden?: boolean;
};
/**
 * A factory for arg parsers that JSON.parse the command-line arguments
 *
 * @param options
 *
 * @returns
 * An any-valued ArgParser
 *
 * @example
 * ```plaintext
 * $ cli --json '{"foo":true}' // named value "json" receives object `{ foo: true }`
 * $ cli --json           // usage error
 * $ cli --json '""' '""' // usage error
 * $ cli --json foo // error parsing JSON
 * ```
 *
 * @throws {@linkcode CliUsageError}
 */
export declare function CliJsonArgParser(options?: CliJsonArgParserOptions): ICliArgParser<any>;
//# sourceMappingURL=cli-json-arg-parser.d.ts.map