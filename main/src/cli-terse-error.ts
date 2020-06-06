/** "code" of a {@linkcode CliTerseError} */
export const CLI_TERSE_ERROR = 'CLI_TERSE_ERROR';

/**
 * Thrown to print an error message but not a `stack`.
 */
export class CliTerseError extends Error {
  /** The string constant {@linkcode CLI_TERSE_ERROR} */
  public readonly code: typeof CLI_TERSE_ERROR;

  constructor(message: string) {
    super(message);
    this.code = CLI_TERSE_ERROR;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
