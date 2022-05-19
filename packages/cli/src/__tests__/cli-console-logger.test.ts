import { CliConsoleLogger } from '../cli-console-logger';
import { CliLogger } from '../cli-logger';
import { deleteGlobal } from '../delete-global';
import { getGlobal } from '../get-global';

describe(CliConsoleLogger.name, () => {
	it('"log" delegates to global console.log if `console` is present', () => {
		const logger = CliConsoleLogger.create();
		const globalConsole = getGlobal<CliLogger>('console');
		const spy = jest.spyOn(globalConsole, 'log').mockImplementation(() => {});
		logger.log('foo');
		expect(spy).toHaveBeenCalledWith('foo');
		spy.mockRestore();
	});

	it('"error" delegates to global `console.error` if `console` exists', () => {
		const logger = CliConsoleLogger.create();
		const globalConsole = getGlobal<CliLogger>('console');

		const spy = jest.spyOn(globalConsole, 'error').mockImplementation(() => {});
		logger.error('foo');
		expect(spy).toHaveBeenCalledWith('foo');
		spy.mockRestore();
	});

	it('uses a no-op logger if `console` does not exist', () => {
		const globalConsole = getGlobal<CliLogger>('console');
		const restoreOriginal = deleteGlobal('console');
		const logger = CliConsoleLogger.create();
		const spy = jest.spyOn(globalConsole, 'log').mockImplementation(() => {});
		logger.log('foo');
		expect(spy).not.toHaveBeenCalled();
		spy.mockRestore();
		restoreOriginal();
	});
});
