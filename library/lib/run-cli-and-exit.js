"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCliAndExit = void 0;
const cli_usage_error_1 = require("./cli-usage-error");
const cli_terse_error_1 = require("./cli-terse-error");
const constants_1 = require("./constants");
const run_cli_1 = require("./run-cli");
const usage_string_1 = require("./usage-string");
async function runCliAndExit(rootCommand, options = {}) {
    const { args = process.argv.slice(2), enhancer, processExit = process.exit, consoleLog = console.log, // eslint-disable-line no-console
    consoleError = console.error, } = options;
    const runCli = run_cli_1.RunCli(rootCommand, { enhancer });
    let exitCode = 0;
    try {
        const result = await runCli(...args);
        if (typeof result !== 'undefined') {
            consoleLog(result);
        }
    }
    catch (exception) {
        exitCode = 1;
        if (!exception) {
            consoleError(`${constants_1.RED_ERROR} Encountered non-truthy exception "${exception}". Please contact the author of this command-line interface`);
        }
        else if (exception.code === cli_usage_error_1.CLI_USAGE_ERROR) {
            const FALLBACK_COMMAND_STACK = { current: rootCommand, parents: [] };
            const usageString = usage_string_1.UsageString(exception.commandStack || FALLBACK_COMMAND_STACK);
            if (exception.message) {
                consoleError(`${usageString}\n\n${constants_1.RED_ERROR} ${exception.message}`);
            }
            else {
                consoleError(usageString);
            }
        }
        else if (exception.code === cli_terse_error_1.CLI_TERSE_ERROR) {
            if (!exception.message) {
                consoleError(exception);
            }
            else {
                consoleError(`${constants_1.RED_ERROR} ${exception.message}`);
            }
        }
        else if (typeof exception.code === 'number') {
            exitCode = exception.code;
            if (exception.message) {
                consoleError(exception.message);
            }
        }
        else {
            consoleError(exception);
        }
    }
    finally {
        processExit(exitCode);
    }
}
exports.runCliAndExit = runCliAndExit;
//# sourceMappingURL=run-cli-and-exit.js.map