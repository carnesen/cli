import { CommandStack } from './types';

export const CLI_USAGE_ERROR = 'CLI_USAGE_ERROR';

/**
 * A custom `Error` class thrown to show a command's usage docs
 */
export class CliUsageError extends Error {
  public readonly code: typeof CLI_USAGE_ERROR;

  public commandStack?: CommandStack;

  /**
   *
   * @param message An `Error` message
   * @param commandStack Used internally for argument processing
   */
  constructor(message?: string, commandStack?: CommandStack) {
    super(message);
    this.code = CLI_USAGE_ERROR;
    this.commandStack = commandStack;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
