import { c, CCliOptions } from '@carnesen/cli';
import { echoCommand } from '../echo-command';

describe(echoCommand.name, () => {
	it('" "-joins and logger.log\'s the provided positional args', async () => {
		const spy = jest.fn();
		const options: CCliOptions = {
			logger: { error() {}, log: spy },
		};
		const cli = c.cli(echoCommand, options);
		const returnValue = await cli.api(['foo', 'bar', 'baz']);
		expect(returnValue).toBe(undefined);
		expect(spy).toHaveBeenCalledWith('foo bar baz');
	});

	it('" "-joins and logger.error\'s the provided positional args if --stderr', async () => {
		const spy = jest.fn();
		const options: CCliOptions = {
			logger: { log() {}, error: spy },
		};
		const cli = c.cli(echoCommand, options);
		await cli.api(['foo', 'bar', 'baz', '--stderr']);
		expect(spy).toHaveBeenCalledWith('foo bar baz');
	});
});
