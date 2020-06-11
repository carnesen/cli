import { runAndCatch } from '@carnesen/run-and-catch';

import { CliUsageError } from '@carnesen/cli';
import { npmStartEscapedArguments, cli } from '.';

describe(npmStartEscapedArguments.name, () => {
	it('runs the provided command', async () => {
		const output = await cli('--', 'echo', '--foo', '--bar');
		expect(output).toMatch('npm start -- echo');
	});

	it('throws usage', async () => {
		const exception = await runAndCatch(cli);
		expect(exception instanceof CliUsageError).toBe(true);
	});
});
