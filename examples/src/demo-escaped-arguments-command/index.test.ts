import { Cli } from '@carnesen/cli';
import { demoEscapedArgumentsCommand } from '.';

const demoEscapedArguments = Cli(demoEscapedArgumentsCommand);

describe(demoEscapedArgumentsCommand.name, () => {
	it("doesn't interpret --foo after -- as a named argument separator", async () => {
		const output = await demoEscapedArguments.api(['--', 'echo', '--foo']);
		expect(output).toMatch('Running echo --foo');
	});
});
