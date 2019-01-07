import { TypeName, Option, Options, Command } from './types';
import { CodedError } from '@carnesen/coded-error';

export function createOption<T extends TypeName>(option: Option<T>) {
  return option;
}

export function createCommand<O extends Options>(command: Command<O>) {
  return command;
}

export const USAGE = 'USAGE';

export class UsageError extends CodedError {
  constructor(message?: string) {
    super(message, USAGE);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
