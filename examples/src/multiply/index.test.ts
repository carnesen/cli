import { CliUsageError } from '@carnesen/cli';
import { runAndCatch } from '@carnesen/run-and-catch';
import { cli } from '.';

describe('readme example', () => {
	it(`throws a ${CliUsageError.name} if no number is provided`, async () => {
		const exception = await runAndCatch(cli);
		expect(exception instanceof CliUsageError).toBe(true);
	});

	it('multiplies the provided numbers together and returns the result', async () => {
		expect(await cli('1', '2', '3')).toBe(6);
	});
});
