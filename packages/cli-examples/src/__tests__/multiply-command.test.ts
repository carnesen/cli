import { c, CCliUsageError } from '@carnesen/cli';
import { runAndCatch } from '@carnesen/run-and-catch';
import { multiplyCommand } from '../multiply-command';

const cli = c.cli(multiplyCommand);

describe(multiplyCommand.name, () => {
	it(`throws a ${CCliUsageError.name} if no number is provided`, async () => {
		const exception = await runAndCatch(() => cli.api([]));
		expect(exception instanceof CCliUsageError).toBe(true);
	});

	it('multiplies the provided numbers together and returns the result', async () => {
		expect(await cli.api(['1', '2', '3'])).toBe(6);
	});
});
