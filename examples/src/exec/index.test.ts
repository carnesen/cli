import { runAndCatch } from '@carnesen/run-and-catch';

import { RunCli, CLI_USAGE_ERROR } from '@carnesen/cli';
import { exec } from '.';

const cliArgRunner = RunCli(exec);

describe(exec.name, () => {
	it('runs the provided command', async () => {
		const output = await cliArgRunner(
			'--',
			'echo',
			'--foo',
			'--bar',
		);
		expect(output).toBe('--foo --bar\n');
	});

	it('throws usage', async () => {
		const output = await runAndCatch(cliArgRunner);
		expect(output.code).toBe(CLI_USAGE_ERROR);
	});
});
