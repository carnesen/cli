import { CliLogger } from './cli-logger';

/** Implements the CliLogger interface with no-op methods */
export class CliNoopLogger implements CliLogger {
	protected constructor() {}

	public log(_message: unknown, ..._optionalParams: unknown[]): void {
		// Do nothing
	}

	public error(_message: unknown, ..._optionalParams: unknown[]): void {
		// Do nothing
	}

	public static create(): CliNoopLogger {
		return new CliNoopLogger();
	}
}
