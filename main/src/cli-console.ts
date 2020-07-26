/**
 * A browser-safe implementation of the Node.js global `console`
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
	return {
		log(message, ...optionalParams) {
			(globalThis as any).console.log(message, ...optionalParams);
		},
		error(message, ...optionalParams) {
			(globalThis as any).console.error(message, ...optionalParams);
		},
	};
}
