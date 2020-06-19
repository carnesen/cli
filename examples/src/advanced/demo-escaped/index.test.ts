import { runAndCatch } from '@carnesen/run-and-catch';

import { CliUsageError } from '@carnesen/cli';
import { demoEscapedArguments, cli } from '.';

describe(demoEscapedArguments.name, () => {
	it('runs the provided command', async () => {
		const output = await cli('--', 'echo', '--foo', '--bar');
		expect(output).toMatch('echo --foo --bar');
	});

	it('throws usage', async () => {
		const exception = await runAndCatch(cli);
		expect(exception instanceof CliUsageError).toBe(true);
	});
});
