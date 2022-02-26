/**
 * A universal implementation of the Node.js global `process`
 */
export interface ICliProcess {
	argv: string[];
	exit: (code?: number) => void;
	stderr: {
		isTTY: boolean;
	};
	stdout: {
		columns: number;
		isTTY: boolean;
	};
}

const DEFAULT_COLUMNS = 100;

/**
 * A factory for [[`ICliProcess`]]es
 * @param options
 */
export function CliProcess(): ICliProcess {
	const { process: globalProcess = {} } = globalThis as any;

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
