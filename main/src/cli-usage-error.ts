import { Node } from './cli-node';

export const CLI_USAGE_ERROR = 'CLI_USAGE_ERROR';

/**
 * A custom error for when you want {@linkcode runCliAndExit} to show command usage and
 * exit, no visible stack trace.
 */
export class CliUsageError extends Error {
  public readonly code: typeof CLI_USAGE_ERROR;

  public node?: Node;

  /**
   *
   * @param message If provided, {@linkcode runCliAndExit} will also print "Error: your
   * message"
   * @param node Used internally for argument processing
   */
  constructor(message?: string, node?: Node) {
    super(message);
    this.code = CLI_USAGE_ERROR;
    this.node = node;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
