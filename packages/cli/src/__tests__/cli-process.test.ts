import { cCliProcessFactory, getGlobalProcess } from '../c-cli-process';
import { deleteGlobal } from '../delete-global';

describe(cCliProcessFactory.name, () => {
	it('works even if there is no global process', () => {
		const restoreOriginal = deleteGlobal('process');
		cCliProcessFactory().exit();
		restoreOriginal();
	});

	it('has an argv property with the current process args in Node.js', () => {
		expect(cCliProcessFactory().argv.length).toBeGreaterThan(0);
	});

	it('argv is an empty array if process.argv does not exist', () => {
		const globalProcess = getGlobalProcess();
		const { argv } = globalProcess;
		delete globalProcess.argv;
		expect(cCliProcessFactory().argv).toEqual([]);
		globalProcess.argv = argv;
	});

	it('"exit" calls global process.exit with 0 by default', () => {
		const spy = jest
			.spyOn(getGlobalProcess(), 'exit')
			.mockImplementation(() => {});
		cCliProcessFactory().exit();
		expect(spy).toHaveBeenCalledWith(0);
		spy.mockRestore();
	});

	it('"exit" does nothing if there is no global process.exit', () => {
		const globalProcess = getGlobalProcess();
		const originalExit = globalProcess.exit;
		delete globalProcess.exit;
		cCliProcessFactory().exit();
		globalProcess.exit = originalExit;
	});

	it('"exit" calls global process.exit with provided code', () => {
		const spy = jest
			.spyOn(getGlobalProcess(), 'exit')
			.mockImplementation(() => {});
		cCliProcessFactory().exit(42);
		expect(spy).toHaveBeenCalledWith(42);
		spy.mockRestore();
	});

	it('stdout.columns returns process.stdout.columns', () => {
		const globalProcess = getGlobalProcess();
		const originalColumns = globalProcess.stdout.columns;
		globalProcess.stdout.columns = 23;
		const result = cCliProcessFactory().stdout.columns;
		expect(result).toBe(23);
		globalProcess.stdout.columns = originalColumns;
	});

	it('stdout.columns returns 100 if not process.stdout', () => {
		const globalProcess = getGlobalProcess();
		const originalStdout = globalProcess.stdout;
		delete globalProcess.stdout;
		expect(cCliProcessFactory().stdout.columns).toBe(100);
		globalProcess.stdout = originalStdout;
	});
});
