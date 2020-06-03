"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArgs = void 0;
const cli_usage_error_1 = require("./cli-usage-error");
/**
 * Calls the parse method of an ArgParser
 *
 * @param argParser - An ArgParser
 * @param args - An array of string arguments
 * @param separator - A string that will be prepended to error messages (e.g. "--users")
 * @returns The result of parse
 */
async function parseArgs(argParser, args, separator, commandStack) {
    const { required, placeholder, parse } = argParser;
    const fullContext = [separator, placeholder].filter((str) => Boolean(str)).join(' ');
    const prefix = fullContext ? `${fullContext} : ` : '';
    if (required && (!args || args.length === 0)) {
        throw new cli_usage_error_1.CliUsageError(`${prefix}argument is required`, commandStack);
    }
    try {
        return await parse(args);
    }
    catch (exception) {
        if (exception && typeof exception.message === 'string') {
            exception.message = `${prefix}${exception.message}`;
        }
        if (exception && exception.code === cli_usage_error_1.CLI_USAGE_ERROR) {
            exception.commandStack = commandStack;
        }
        throw exception;
    }
}
exports.parseArgs = parseArgs;
//# sourceMappingURL=parse-args.js.map