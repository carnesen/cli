import { CliProcess } from '../cli-process';

describe(CliProcess.name, () => {
	it('works even if there is no global process', () => {
		const originalProcess = globalThis.process;
		delete globalThis.process;
		CliProcess().exit();
		globalThis.process = originalProcess;
	});

	it('has an argv property with the current process args in Node.js', () => {
		expect(CliProcess().argv.length).toBeGreaterThan(0);
	});

	it('argv is an empty array if process.argv does not exist', () => {
		const { argv: originalArgv } = (globalThis as any).process;
		delete (globalThis as any).process.argv;
		expect(CliProcess().argv).toEqual([]);
		(globalThis as any).process.argv = originalArgv;
	});

	it('"exit" calls global process.exit with 0 by default', () => {
		const spy = jest
			.spyOn((globalThis as any).process, 'exit')
			.mockImplementation(() => {});
		CliProcess().exit();
		expect(spy).toHaveBeenCalledWith(0);
		spy.mockRestore();
	});

	it('"exit" does nothing if there is no global process.exit', () => {
		const originalExit = (globalThis as any).process.exit;
		delete (globalThis as any).process.exit;
		CliProcess().exit();
		(globalThis as any).process.exit = originalExit;
	});

	it('"exit" calls global process.exit with provided code', () => {
		const spy = jest
			.spyOn((globalThis as any).process, 'exit')
			.mockImplementation(() => {});
		CliProcess().exit(42);
		expect(spy).toHaveBeenCalledWith(42);
		spy.mockRestore();
	});

	it('stdout.columns returns process.stdout.columns', () => {
		(globalThis as any).process.stdout.columns = 23;
		const result = CliProcess().stdout.columns;
		expect(result).toBe(23);
	});

	it('stdout.columns returns 100 if not process.stdout', () => {
		const originalStdout = globalThis.process.stdout;
		delete globalThis.process.stdout;
		expect(CliProcess().stdout.columns).toBe(100);
		globalThis.process.stdout = originalStdout;
	});
});
