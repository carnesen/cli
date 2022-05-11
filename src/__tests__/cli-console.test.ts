import { CliConsole } from '../cli-console';

describe(CliConsole.name, () => {
	const cliConsole = CliConsole();
	it('"log" delegates to global console.log', () => {
		const spy = jest
			.spyOn((globalThis as any).console, 'log')
			.mockImplementation(() => {});
		cliConsole.log('foo');
		expect(spy).toHaveBeenCalledWith('foo');
		spy.mockRestore();
	});

	it('"error" delegates to global console.error', () => {
		const spy = jest
			.spyOn((globalThis as any).console, 'error')
			.mockImplementation(() => {});
		cliConsole.error('foo');
		expect(spy).toHaveBeenCalledWith('foo');
		spy.mockRestore();
	});
});
