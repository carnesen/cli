"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliUsageError = exports.CLI_USAGE_ERROR = void 0;
exports.CLI_USAGE_ERROR = 'CLI_USAGE_ERROR';
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
class CliUsageError extends Error {
    /**
     *
     * @param message An `Error` message
     * @param commandStack Used internally for argument processing
     */
    constructor(message, commandStack) {
        super(message);
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "commandStack", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.code = exports.CLI_USAGE_ERROR;
        this.commandStack = commandStack;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.CliUsageError = CliUsageError;
//# sourceMappingURL=cli-usage-error.js.map