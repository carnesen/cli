"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunCli = void 0;
const partition_args_1 = require("./partition-args");
const get_named_values_1 = require("./get-named-values");
const cli_usage_error_1 = require("./cli-usage-error");
const cli_terse_error_1 = require("./cli-terse-error");
const find_version_1 = require("./find-version");
const parse_args_1 = require("./parse-args");
const navigate_to_command_1 = require("./navigate-to-command");
/**
 *
 * @remarks
 * Returns a function of the form `(...args: string[]) => Promise<any>` that can be invoked as e.g. `cli('foo', 'bar')` for unit tests or as `cli(process.argv.slice(2))` in an executable CLI script.

 * @param rootCommand
 * @param options
 */
function RunCli(rootCommand, options = {}) {
    const { enhancer } = options;
    if (enhancer) {
        return enhancer(runCli);
    }
    return runCli;
    async function runCli(...args) {
        // If the very first argument is --version, return this software's version identifier.
        if (args[0] === '--version') {
            const version = await find_version_1.findVersion();
            if (!version) {
                throw new cli_terse_error_1.CliTerseError('Failed to find a "version" string');
            }
            return version;
        }
        const [commandStack, remainingArgs] = navigate_to_command_1.navigateToCommand(rootCommand, args);
        const { positionalArgs, namedArgs, escapedArgs } = partition_args_1.partitionArgs(remainingArgs);
        if (namedArgs.help) {
            throw new cli_usage_error_1.CliUsageError(undefined, commandStack);
        }
        const command = commandStack.current;
        let argsValue;
        if (command.positionalArgParser) {
            // Note that for named and escaped args, we distinguish between
            // `undefined` and `[]`. For example, "cli" gives an escaped args
            // `undefined` whereas "cli --" gives an escaped args `[]`. For the
            // "positionalArgs", however, there is no such distinction. By convention,
            // we elect here to pass in `undefined` rather than an empty array when no
            // positional arguments are passed.
            argsValue = await parse_args_1.parseArgs(command.positionalArgParser, positionalArgs.length > 0 ? positionalArgs : undefined, undefined, commandStack);
        }
        else if (positionalArgs.length > 0) {
            throw new cli_usage_error_1.CliUsageError(`Unexpected argument "${positionalArgs[0]}" : Command "${command.name}" does not accept positional arguments`, commandStack);
        }
        const namedValues = await get_named_values_1.getNamedValues(command.namedArgParsers || {}, namedArgs, commandStack);
        let escapedValue;
        if (command.escapedArgParser) {
            escapedValue = await parse_args_1.parseArgs(command.escapedArgParser, escapedArgs, '--', commandStack);
        }
        else if (escapedArgs) {
            throw new cli_usage_error_1.CliUsageError(`Command "${command.name}" does not allow "--" as an argument`);
        }
        try {
            const result = await command.action(argsValue, namedValues, escapedValue);
            return result;
        }
        catch (exception) {
            if (exception && exception.code === cli_usage_error_1.CLI_USAGE_ERROR) {
                exception.commandStack = commandStack;
            }
            throw exception;
        }
    }
}
exports.RunCli = RunCli;
//# sourceMappingURL=run-cli.js.map