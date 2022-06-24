import { CCliLogger } from './c-cli-logger';
import { CCliNoopLogger } from './c-cli-noop-logger';
import { getGlobal } from './get-global';

/** Implements the `CCliLogger` interface using the global `console` object if
 * it exists or a no-op logger if it does not */
export class CCliConsoleLogger implements CCliLogger {
	protected constructor(private readonly logger: CCliLogger) {}

	public log(message?: unknown, ...optionalParams: unknown[]): void {
		this.logger.log(message, ...optionalParams);
	}

	public error(message?: unknown, ...optionalParams: unknown[]): void {
		this.logger.error(message, ...optionalParams);
	}

	public static create(): CCliConsoleLogger {
		const globalConsole: CCliLogger | undefined = getGlobal('console');
		return new CCliConsoleLogger(
			typeof globalConsole === 'object'
				? globalConsole
				: CCliNoopLogger.create(),
		);
	}
}
