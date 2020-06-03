import { BranchOrCommandStack } from './types';
export declare const CLI_USAGE_ERROR = "CLI_USAGE_ERROR";
/**
 * A custom error with code {@linkcode CLI_USAGE_ERROR}
 * @remarks
 * {@linkcode runCliAndExit} catches this class of error and prints command-line usage
 * (i.e. "Usage: cloud users lists ...") for the current command. If the `message`
 * property is provided, `runCliAndExit` will normal `Error`. See also print `Error: <your
 * message>`. See also {@linkcode CliTerseError}.
 * @example
 * ```typescript
 * throw new CliUsageError("Expected one or more values")
 * ```
 */
export declare class CliUsageError extends Error {
    readonly code: typeof CLI_USAGE_ERROR;
    commandStack?: BranchOrCommandStack;
    /**
     *
     * @param message An `Error` message
     * @param commandStack Used internally for argument processing
     */
    constructor(message?: string, commandStack?: BranchOrCommandStack);
}
//# sourceMappingURL=cli-usage-error.d.ts.map