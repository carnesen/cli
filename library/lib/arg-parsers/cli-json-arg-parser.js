"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliJsonArgParser = void 0;
const parseJson = require("parse-json");
const cli_usage_error_1 = require("../cli-usage-error");
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
function CliJsonArgParser(options = {}) {
    const { placeholder = '<json>', required = false, description, hidden = false, } = options;
    const argParser = {
        required,
        placeholder,
        hidden,
        parse(args) {
            if (!args) {
                return undefined;
            }
            if (args.length !== 1) {
                throw new cli_usage_error_1.CliUsageError(`Expected a single ${placeholder} string`);
            }
            try {
                const parsed = parseJson(args[0]);
                return parsed;
            }
            catch (exception) {
                throw new cli_usage_error_1.CliUsageError(exception.message);
            }
        },
        description,
    };
    return argParser;
}
exports.CliJsonArgParser = CliJsonArgParser;
//# sourceMappingURL=cli-json-arg-parser.js.map