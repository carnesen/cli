import { Node } from './cli-node';

export const CLI_USAGE_ERROR = 'CLI_USAGE_ERROR';

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
export class CliUsageError extends Error {
  public readonly code: typeof CLI_USAGE_ERROR;

  public locationInCommandTree?: Node;

  /**
   *
   * @param message An `Error` message
   * @param node Used internally for argument processing
   */
  constructor(message?: string, node?: Node) {
    super(message);
    this.code = CLI_USAGE_ERROR;
    this.locationInCommandTree = node;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
