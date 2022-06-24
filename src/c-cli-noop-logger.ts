import { CCliLogger } from './c-cli-logger';

/** Implements the CliLogger interface with no-op methods */
export class CCliNoopLogger implements CCliLogger {
	protected constructor() {}

	public log(_message: unknown, ..._optionalParams: unknown[]): void {
		// Do nothing
	}

	public error(_message: unknown, ..._optionalParams: unknown[]): void {
		// Do nothing
	}

	public static create(): CCliNoopLogger {
		return new CCliNoopLogger();
	}
}
