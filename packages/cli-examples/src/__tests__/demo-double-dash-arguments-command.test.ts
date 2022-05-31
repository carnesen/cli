import { c } from '@carnesen/cli';
import { demoDoubleDashArgumentsCommand } from '../demo-double-dash-arguments-command';

const demoDoubleDashArguments = c.cli(demoDoubleDashArgumentsCommand);

describe(demoDoubleDashArgumentsCommand.name, () => {
	it("doesn't interpret --foo after -- as a named argument separator", async () => {
		const output = await demoDoubleDashArguments.api(['--', 'echo', '--foo']);
		expect(output).toMatch('Running echo --foo');
	});
});
