export const CLI_TERSE_ERROR = 'CLI_TERSE_ERROR';

/**
 * A custom error for when you want {@linkcode runCliAndExit} to only print the message,
 * not the stack trace.
 */
export class CliTerseError extends Error {
  public readonly code: typeof CLI_TERSE_ERROR;

  constructor(message: string) {
    super(message);
    this.code = CLI_TERSE_ERROR;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
