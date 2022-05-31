import { c, CCliUsageError } from '@carnesen/cli';
import { runAndCatch } from '@carnesen/run-and-catch';
import { parseJsonCommand } from '../parse-json-command';

const cli = c.cli(parseJsonCommand);

describe(parseJsonCommand.name, () => {
	it(`throws a ${CCliUsageError.name} if no json is provided`, async () => {
		const exception = await runAndCatch(() => cli.api([]));
		expect(exception instanceof CCliUsageError).toBe(true);
	});

	it('parses the provided json and returns the result', async () => {
		const obj = { foo: 'bar' };
		expect(await cli.api([JSON.stringify(obj)])).toEqual(obj);
	});
});
