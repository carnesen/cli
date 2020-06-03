import { CommandStack } from './types';
import { AnyArgParser } from './cli-arg-parser';
/**
 * Calls the parse method of an ArgParser
 *
 * @param argParser - An ArgParser
 * @param args - An array of string arguments
 * @param separator - A string that will be prepended to error messages (e.g. "--users")
 * @returns The result of parse
 */
export declare function parseArgs(argParser: AnyArgParser, args: string[] | undefined, separator: string | undefined, commandStack: CommandStack): Promise<any>;
//# sourceMappingURL=parse-args.d.ts.map