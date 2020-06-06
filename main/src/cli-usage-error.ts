import { Node } from './cli-node';

/** "code" of a {@link CliUsageError} */
export const CLI_USAGE_ERROR = 'CLI_USAGE_ERROR';

/**
 * Thrown to print command usage and an error message but not a `stack`
 */
export class CliUsageError extends Error {
  /** The string constant {@linkcode CLI_USAGE_ERROR} */
  public readonly code: typeof CLI_USAGE_ERROR;

  /** Used internally for constructing the command-line usage string */
  public node?: Node;

  /**
   * @param message If provided, {@linkcode runCliAndExit} will also print "Error: \<your
   * message\>"
   * @param node Used internally for constructing the command-line usage string
   */
  constructor(message?: string, node?: Node) {
    super(message);
    this.code = CLI_USAGE_ERROR;
    this.node = node;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
