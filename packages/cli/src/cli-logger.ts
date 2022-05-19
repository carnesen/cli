/** Isomorphic subset of the global `console` object */
export interface CliLogger {
	log: (message?: any, ...optionalParams: any[]) => void;
	error: (message?: any, ...optionalParams: any[]) => void;
}
