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
	const { console: globalConsole } = globalThis as unknown as {
		console: ICliConsole;
	};
	return {
		log(message, ...optionalParams) {
			globalConsole.log(message, ...optionalParams);
		},
		error(message, ...optionalParams) {
			globalConsole.error(message, ...optionalParams);
		},
	};
}
