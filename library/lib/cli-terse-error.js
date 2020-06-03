"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliTerseError = exports.CLI_TERSE_ERROR = void 0;
exports.CLI_TERSE_ERROR = 'CLI_TERSE_ERROR';
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
class CliTerseError extends Error {
    constructor(message) {
        super(message);
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.code = exports.CLI_TERSE_ERROR;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.CliTerseError = CliTerseError;
//# sourceMappingURL=cli-terse-error.js.map