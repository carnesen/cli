export declare const CLI_TERSE_ERROR = "CLI_TERSE_ERROR";
/**
 * A custom error with code {@linkcode CLI_TERSE_ERROR}
 * @remarks
 * {@linkcode runCliAndExit} catches this class of error and only prints the `message`
 * property; it does _not_ print the stack trace link it would for a normal `Error`. See
 * also {@linkcode CliUsageError}.
 * @example
 * ```typescript
 * throw new CliTerseError("An unexpected error has occurred.")
 * ```
 */
export declare class CliTerseError extends Error {
    readonly code: typeof CLI_TERSE_ERROR;
    constructor(message: string);
}
//# sourceMappingURL=cli-terse-error.d.ts.map