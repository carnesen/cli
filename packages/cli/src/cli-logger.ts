/**
 * A universal subset of the usual global `console` object
 */
export interface ICliLogger {
	log: (message?: any, ...optionalParams: any[]) => void;
	error: (message?: any, ...optionalParams: any[]) => void;
}

/**
 * A factory for [[`ICliConsole`]]s
 * @param options
 */
export class CliLogger {
	private constructor(
		private readonly console = (globalThis as { console: ICliLogger }).console,
	) {}

	log(message: any, ...optionalParams: any[]): void {
		this.console.log(message, ...optionalParams);
	}

	error(message: any, ...optionalParams: any[]): void {
		this.console.error(message, ...optionalParams);
	}

	static create(): CliLogger {
		return new CliLogger();
	}
}
