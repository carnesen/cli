import { BranchOrCommandStack, CommandStack, BranchOrCommand } from './types';
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
export declare function navigateToCommand(command: BranchOrCommand, args: string[]): [CommandStack, string[]];
export declare function recursiveNavigateToCommand(commandStack: BranchOrCommandStack, args: string[]): [CommandStack, string[]];
//# sourceMappingURL=navigate-to-command.d.ts.map