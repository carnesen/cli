/**
 * A universal subset of the usual global `console` object
 */
export interface ICliConsole {
	log: (message?: any, ...optionalParams: any[]) => void;
	error: (message?: any, ...optionalParams: any[]) => void;
}

/**
 * A factory for [[`ICliConsole`]]s
 * @param options
 */
export function CliConsole(): ICliConsole {
	const { console } = globalThis as { console: ICliConsole };
	return {
		log(message, ...optionalParams) {
			console.log(message, ...optionalParams);
		},
		error(message, ...optionalParams) {
			console.error(message, ...optionalParams);
		},
	};
}

/**
 * A factory for [[`ICliConsole`]]s that do not actually write to console
 * @param options
 */
export function CliNoConsole(): ICliConsole {
	return {
		log() {
			// do nothing
		},
		error() {
			// do nothing
		},
	};
}
