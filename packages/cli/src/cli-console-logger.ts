import { CliLogger } from './cli-logger';
import { CliNoopLogger } from './cli-noop-logger';
import { getGlobal } from './get-global';

/** Implements the CliLogger interface using the global `console` object if
 * it exists or a no-op logger if it does not */
export class CliConsoleLogger implements CliLogger {
	protected constructor(private readonly logger: CliLogger) {}

	public log(message?: unknown, ...optionalParams: unknown[]): void {
		this.logger.log(message, ...optionalParams);
	}

	public error(message?: unknown, ...optionalParams: unknown[]): void {
		this.logger.error(message, ...optionalParams);
	}

	public static create(): CliConsoleLogger {
		const globalConsole: CliLogger | undefined = getGlobal('console');
		return new CliConsoleLogger(
			typeof globalConsole === 'object'
				? globalConsole
				: CliNoopLogger.create(),
		);
	}
}
