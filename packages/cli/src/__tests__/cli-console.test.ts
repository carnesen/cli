import { CliConsole } from '../cli-logger';

describe(CliConsole.name, () => {
	const cliConsole = CliLogger.create();
	it('"log" delegates to global console.log', () => {
		const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
		cliConsole.log('foo');
		expect(spy).toHaveBeenCalledWith('foo');
		spy.mockRestore();
	});

	it('"error" delegates to global console.error', () => {
		const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
		cliConsole.error('foo');
		expect(spy).toHaveBeenCalledWith('foo');
		spy.mockRestore();
	});
});
