import { Cli, CCliOptions } from '@carnesen/cli';
import { echoCommand } from '../echo-command';

describe(echoCommand.name, () => {
	it('" "-joins and console.log\'s the provided positional args', async () => {
		const spy = jest.fn();
		const options: CCliOptions = {
			console: { error() {}, log: spy },
		};
		const cli = Cli(echoCommand, options);
		const returnValue = await cli.api(['foo', 'bar', 'baz']);
		expect(returnValue).toBe(undefined);
		expect(spy).toHaveBeenCalledWith('foo bar baz');
	});

	it('" "-joins and console.error\'s the provided positional args if --stderr', async () => {
		const spy = jest.fn();
		const options: CCliOptions = {
			console: { log() {}, error: spy },
		};
		const cli = Cli(echoCommand, options);
		await cli.api(['foo', 'bar', 'baz', '--stderr']);
		expect(spy).toHaveBeenCalledWith('foo bar baz');
	});
});
