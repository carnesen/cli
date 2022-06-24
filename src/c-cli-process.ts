import { getGlobal } from './get-global';

/** An isomorphic subset of the Node.js global `process` object. By defining our
 * own type for this we avoid depending on `@types/node` package */
export type CCliProcess = {
	argv: string[];
	exit: (code?: number) => void;
	stderr: {
		isTTY: boolean;
	};
	stdout: {
		columns: number;
		isTTY: boolean;
	};
};

/** Get a reference to the global variable `process` if it exists. The return
 * value is type-asserted as `any` so be careful with it. */
export function getGlobalProcess(): any {
	return getGlobal('process');
}

const DEFAULT_COLUMNS = 100;

/** A factory for {@link CCliProcess} objects that are a type- and
 * environment-safe alternative to the Node.js global `process` */
export function cCliProcessFactory(): CCliProcess {
	const globalProcess = getGlobalProcess() ?? {};

	return {
		argv: Array.isArray(globalProcess.argv) ? globalProcess.argv : [],
		exit(code = 0) {
			if (typeof globalProcess.exit === 'function') {
				globalProcess.exit(code);
			}
		},
		stderr: {
			isTTY:
				typeof globalProcess.stderr === 'object'
					? Boolean(globalProcess.stderr.isTTY)
					: true,
		},
		stdout: {
			get columns() {
				return typeof globalProcess.stdout === 'object' &&
					typeof globalProcess.stdout.columns === 'number'
					? globalProcess.stdout.columns
					: DEFAULT_COLUMNS;
			},
			isTTY:
				typeof globalProcess.stdout === 'object'
					? Boolean(globalProcess.stdout.isTTY)
					: true,
		},
	};
}
