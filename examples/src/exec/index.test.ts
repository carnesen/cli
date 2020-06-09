import { runAndCatch } from '@carnesen/run-and-catch';

import { Cli, CLI_USAGE_ERROR } from '@carnesen/cli';
import { exec } from '.';

const cliArgRunner = Cli(exec);

describe(exec.name, () => {
	it('runs the provided command', async () => {
		const output = await cliArgRunner('--', 'echo', '--foo', '--bar');
		expect(output).toBe('--foo --bar\n');
	});

	it('throws usage', async () => {
		const output = await runAndCatch(cliArgRunner);
		expect(output.code).toBe(CLI_USAGE_ERROR);
	});
});
