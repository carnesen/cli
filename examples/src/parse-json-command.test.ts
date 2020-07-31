import { CliUsageError, Cli } from '@carnesen/cli';
import { runAndCatch } from '@carnesen/run-and-catch';
import { parseJsonCommand } from './parse-json-command';

const cli = Cli(parseJsonCommand);

describe(parseJsonCommand.name, () => {
	it(`throws a ${CliUsageError.name} if no json is provided`, async () => {
		const exception = await runAndCatch(cli.api, []);
		expect(exception instanceof CliUsageError).toBe(true);
	});

	it('parses the provided json and returns the result', async () => {
		const obj = { foo: 'bar' };
		expect(await cli.api([JSON.stringify(obj)])).toEqual(obj);
	});
});
