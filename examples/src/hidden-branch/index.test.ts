import { RunCli } from '@carnesen/cli';
import { rootBranch } from '.';

const runCli = RunCli(rootBranch);

describe(runCli.name, () => {
	it('has a command "secret echo"', async () => {
		expect(await runCli('secret', 'echo', 'foo')).toBe(
			'foo',
		);
	});
});
