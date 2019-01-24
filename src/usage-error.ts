export class UsageError extends Error {
  public readonly code: 'USAGE';
  constructor(message?: string) {
    super(message);
    this.code = 'USAGE';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
