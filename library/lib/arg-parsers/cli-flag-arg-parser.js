"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliFlagArgParser = void 0;
const cli_usage_error_1 = require("../cli-usage-error");
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
function CliFlagArgParser(options = {}) {
    const { description, hidden = false } = options;
    const argParser = {
        placeholder: '',
        required: false,
        hidden,
        parse(args) {
            if (!args) {
                return false;
            }
            if (args.length > 0) {
                throw new cli_usage_error_1.CliUsageError(`Unexpected argument "${args[0]}"`);
            }
            return true;
        },
        description,
    };
    return argParser;
}
exports.CliFlagArgParser = CliFlagArgParser;
//# sourceMappingURL=cli-flag-arg-parser.js.map