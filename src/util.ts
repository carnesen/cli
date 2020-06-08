import { CliUsageError } from './cli-usage-error';

export function wrapInSquareBrackets(str: string): string {
  return `[${str}]`;
}

export function wrapInCurlyBrackets(str: string): string {
  return `{${str}}`;
}

export function convertToNumber(rawValue: string): number {
  let value = NaN;
  if (rawValue.length > 0) {
    value = Number(rawValue);
  }
  if (Number.isNaN(value)) {
    throw new CliUsageError(`"${rawValue}" is not a number`);
  }
  return value;
}
