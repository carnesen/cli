import { CCliConsoleLogger } from '../c-cli-console-logger';
import { CCliLogger } from '../c-cli-logger';
import { deleteGlobal } from '../delete-global';
import { getGlobal } from '../get-global';

describe(CCliConsoleLogger.name, () => {
	it('"log" delegates to global console.log if `console` is present', () => {
		const logger = CCliConsoleLogger.create();
		const globalConsole = getGlobal<CCliLogger>('console');
		const spy = jest.spyOn(globalConsole, 'log').mockImplementation(() => {});
		logger.log('foo');
		expect(spy).toHaveBeenCalledWith('foo');
		spy.mockRestore();
	});

	it('"error" delegates to global `console.error` if `console` exists', () => {
		const logger = CCliConsoleLogger.create();
		const globalConsole = getGlobal<CCliLogger>('console');

		const spy = jest.spyOn(globalConsole, 'error').mockImplementation(() => {});
		logger.error('foo');
		expect(spy).toHaveBeenCalledWith('foo');
		spy.mockRestore();
	});

	it('uses a no-op logger if `console` does not exist', () => {
		const globalConsole = getGlobal<CCliLogger>('console');
		const restoreOriginal = deleteGlobal('console');
		const logger = CCliConsoleLogger.create();
		const spy = jest.spyOn(globalConsole, 'log').mockImplementation(() => {});
		logger.log('foo');
		expect(spy).not.toHaveBeenCalled();
		spy.mockRestore();
		restoreOriginal();
	});
});
