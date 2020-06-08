import { runAndCatch } from '@carnesen/run-and-catch';

import { Cli } from '@carnesen/cli';
import { throwSpecialError } from '.';

const cli = Cli(throwSpecialError);

describe('throw CLI', () => {
	it('throws', async () => {
		const ex = await runAndCatch(cli, '--message', 'foo');
		expect(ex.message).toBe('foo');
	});
});
