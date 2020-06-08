import { Cli } from '@carnesen/cli';
import { root } from '.';

const cli = Cli(root);

describe(root.name, () => {
	it('has a hidden command "hidden-echo"', async () => {
		expect(await cli('hidden-echo', 'foo')).toBe('foo');
	});
});
