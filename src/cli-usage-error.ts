import { CommandStack } from './types';

export const CLI_USAGE_ERROR = 'CLI_USAGE_ERROR';

export class CliUsageError extends Error {
  public readonly code: typeof CLI_USAGE_ERROR;

  public commandStack?: CommandStack;

  constructor(message?: string, commandStack?: CommandStack) {
    super(message);
    this.code = CLI_USAGE_ERROR;
    this.commandStack = commandStack;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
