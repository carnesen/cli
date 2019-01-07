import { CodedError } from '@carnesen/coded-error';

export const USAGE = 'USAGE';

export class UsageError extends CodedError {
  constructor(message?: string) {
    super(message, USAGE);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
