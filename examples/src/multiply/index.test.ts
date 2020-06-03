import { RunCli } from '@carnesen/cli';
import { multiply } from '.';

const cli = RunCli(multiply);

describe('readme example', () => {
	it('multiplies the provided numbers together', async () => {
		expect(await cli('1', '2', '3')).toBe(6);
	});
});
