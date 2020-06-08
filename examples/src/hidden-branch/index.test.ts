import { Cli } from '@carnesen/cli';
import { rootBranch } from '.';

const runCli = Cli(rootBranch);

describe(runCli.name, () => {
	it('has a command "secret echo"', async () => {
		expect(await runCli('secret', 'echo', 'foo')).toBe(
			'foo',
		);
	});
});
