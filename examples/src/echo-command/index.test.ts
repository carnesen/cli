import { Cli, ICliOptions, CliNoConsole } from '@carnesen/cli';
import { echoCommand } from '.';

describe(echoCommand.name, () => {
	it('" "-joins and console.log\'s the provided positional args', async () => {
		const spy = jest.fn();
		const options: ICliOptions = {
			console: { ...CliNoConsole(), log: spy },
		};
		const cli = Cli(echoCommand, options);
		const returnValue = await cli.api(['foo', 'bar', 'baz']);
		expect(returnValue).toBe(undefined);
		expect(spy).toHaveBeenCalledWith('foo bar baz');
	});

	it('" "-joins and console.error\'s the provided positional args if --error', async () => {
		const spy = jest.fn();
		const options: ICliOptions = {
			console: { ...CliNoConsole(), error: spy },
		};
		const cli = Cli(echoCommand, options);
		await cli.api(['foo', 'bar', 'baz', '--error']);
		expect(spy).toHaveBeenCalledWith('foo bar baz');
	});
});
