import { runAndCatch } from '@carnesen/run-and-catch';

import { RunCli } from '@carnesen/cli';
import { throwSpecialError } from '.';

const cli = RunCli(throwSpecialError);

describe('throw CLI', () => {
	it('throws', async () => {
		const ex = await runAndCatch(cli, '--message', 'foo');
		expect(ex.message).toBe('foo');
	});
});
