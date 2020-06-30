import { Cli } from '@carnesen/cli';
import { echoCommand } from '.';

const cli = Cli(echoCommand);

describe(echoCommand.name, () => {
	it('" "-joins and returns the provided positional args', async () => {
		const returnValue = await cli('foo', 'bar', 'baz');
		expect(returnValue).toBe('foo bar baz');
	});
});
