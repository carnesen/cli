import { RunCli } from '@carnesen/cli';
import { echo } from '.';

describe(echo.name, () => {
	it('" "-joins and returns the provided positional args', async () => {
		expect(await RunCli(echo)('foo', 'bar', 'baz')).toBe(
			'foo bar baz',
		);
	});
});
