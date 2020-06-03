import { RunCli } from '@carnesen/cli';
import { root } from '.';

const cli = RunCli(root);

describe(root.name, () => {
	it('has a hidden command "hidden-echo"', async () => {
		expect(await cli('hidden-echo', 'foo')).toBe('foo');
	});
});
