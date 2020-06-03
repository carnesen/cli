"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recursiveNavigateToCommand = exports.navigateToCommand = void 0;
const constants_1 = require("./constants");
const cli_usage_error_1 = require("./cli-usage-error");
/**
 * Navigate a tree of commands to find a command
 *
 * @remarks
 * This function uses recursion to construct a linked list of commands. For example,
 * suppose the full command-line is:
 * ```
 * $ cloud-cli user login --username carnesen
 * ```
 * The root command is a branch with a subcommand "user", which in turn has a subcommand
 * "login", a command.
 *
 * The recursion terminates when a command is reached
 * @param command - A CliCommand of
 * @param args - An array of string command-line arguments
 * @returns A Command Stack and the remaining unprocessed command-line args
 *
 * @hidden
 */
function navigateToCommand(command, args) {
    return recursiveNavigateToCommand({ current: command, parents: [] }, args);
}
exports.navigateToCommand = navigateToCommand;
function recursiveNavigateToCommand(commandStack, args) {
    const { current, parents } = commandStack;
    // Terminate recursion if current is a command
    if (current.commandType === constants_1.CLI_COMMAND) {
        return [{ current, parents }, args];
    }
    // current is a branch
    if (args.length === 0) {
        // Example: Full command is "cli user login". They've done "cli user". In this case we
        // want to print the usage string but not an error message.
        throw new cli_usage_error_1.CliUsageError(undefined, commandStack);
    }
    if (args[0] === '--help') {
        throw new cli_usage_error_1.CliUsageError(undefined, commandStack);
    }
    const next = current.subcommands.find((subcommand) => subcommand.name === args[0]);
    if (!next) {
        // Example: Full command is "cli user login". They've done "cli login".
        throw new cli_usage_error_1.CliUsageError(`Bad command "${args[0]}"`, commandStack);
    }
    return recursiveNavigateToCommand({
        parents: [...parents, current],
        current: next,
    }, args.slice(1));
}
exports.recursiveNavigateToCommand = recursiveNavigateToCommand;
//# sourceMappingURL=navigate-to-command.js.map