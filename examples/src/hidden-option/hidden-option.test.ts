import { RunCli } from '@carnesen/cli';
import { rootCommand } from './hidden-option';

const runCli = RunCli(rootCommand);

describe(rootCommand.name, () => {
	it('normally just echos', async () => {
		expect(await runCli('foo')).toEqual('foo');
	});
	it('has a hidden option "--pizza"', async () => {
		expect(await runCli('foo', '--pizza')).toMatch(
			'__________',
		);
	});
});
