import { Cli, ICliOptions } from '@carnesen/cli';
import { hidingBranch, hiddenBranch, nonHiddenBranch } from '.';
import { echoCommand } from '../echo-command';
import { echoHiddenCommand } from '../echo-hidden-command';

describe(hidingBranch.name, () => {
	it(`has a hidden command ${echoHiddenCommand.name}`, async () => {
		const cli = Cli(hidingBranch);
		expect(await cli.api([echoHiddenCommand.name, 'foo'])).toBe('foo');
	});

	it(`only shows usage for commands in hidden branches if they're navigated to`, async () => {
		let sawHiddenBranchEcho = false;
		let sawNonHiddenBranchEcho = false;
		let sawHiddenBranchSubcommands = false;
		const options: ICliOptions = {
			processExit() {},
			consoleError(arg) {
				if (typeof arg === 'string') {
					if (arg.includes(`${hiddenBranch.name} ${echoCommand.name}`)) {
						sawHiddenBranchEcho = true;
					}
					if (arg.includes(`${nonHiddenBranch.name} ${echoCommand.name}`)) {
						sawNonHiddenBranchEcho = true;
					}
					if (arg.includes(`${hiddenBranch.name} <subcommand>`)) {
						sawHiddenBranchSubcommands = true;
					}
				}
			},
			consoleLog() {},
		};

		const cli = Cli(hidingBranch, options);
		await cli.run(['--help']);
		expect(sawHiddenBranchEcho).toBe(false);
		expect(sawHiddenBranchSubcommands).toBe(false);
		expect(sawNonHiddenBranchEcho).toBe(true);

		await cli.run([hiddenBranch.name, '--help']);
		expect(sawHiddenBranchSubcommands).toBe(true);
	});
});
