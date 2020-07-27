import { CliConsole, CliNoConsole } from '../cli-console';

describe(CliConsole.name, () => {
	const cliConsole = CliConsole();
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

describe(CliNoConsole.name, () => {
	const cliConsole = CliNoConsole();
	it('"log" does nothing especially not call console.log', () => {
		const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
		cliConsole.log('foo');
		expect(spy).not.toHaveBeenCalled();
		spy.mockRestore();
	});

	it('"error" does nothing especially not call console.error', () => {
		const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
		cliConsole.error('foo');
		expect(spy).not.toHaveBeenCalled();
		spy.mockRestore();
	});
});
