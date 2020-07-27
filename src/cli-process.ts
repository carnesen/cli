/**
 * A universal implementation of the Node.js global `process`
 */
export interface ICliProcess {
	argv: string[];
	exit: (code?: number) => void;
	stdout: {
		columns: number;
	};
}

const DEFAULT_COLUMNS = 100;

/**
 * A factory for [[`ICliProcess`]]es
 * @param options
 */
export function CliProcess(): ICliProcess {
	const _process = (globalThis as any).process || {};
	return {
		argv: Array.isArray(_process.argv) ? _process.argv : [],
		exit(code = 0) {
			if (typeof _process.exit === 'function') {
				_process.exit(code);
			}
		},
		stdout: {
			get columns() {
				return typeof _process.stdout === 'object' &&
					typeof _process.stdout.columns === 'number'
					? _process.stdout.columns
					: DEFAULT_COLUMNS;
			},
		},
	};
}
