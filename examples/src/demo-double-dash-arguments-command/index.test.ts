import { Cli } from '@carnesen/cli';
import { demoDoubleDashArgumentsCommand } from '.';

const demoDoubleDashArguments = Cli(demoDoubleDashArgumentsCommand);

describe(demoDoubleDashArgumentsCommand.name, () => {
	it("doesn't interpret --foo after -- as a named argument separator", async () => {
		const output = await demoDoubleDashArguments.api(['--', 'echo', '--foo']);
		expect(output).toMatch('Running echo --foo');
	});
});
