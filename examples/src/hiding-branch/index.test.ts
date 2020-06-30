import { IRunCliAndExitOptions, Cli, runCliAndExit } from '@carnesen/cli';
import { hidingBranch, hiddenBranch, nonHiddenBranch } from '.';
import { echoCommand } from '../echo-command';
import { echoHiddenCommand } from '../echo-hidden-command';

describe(hidingBranch.name, () => {
	it(`has a hidden command ${echoHiddenCommand.name}`, async () => {
		const cli = Cli(hidingBranch);
		expect(await cli(echoHiddenCommand.name, 'foo')).toBe('foo');
	});

	it(`only shows usage for commands in hidden branches if they're navigated to`, async () => {
		const branchHidingCli = Cli(hidingBranch);
		let sawHiddenBranchEcho = false;
		let sawNonHiddenBranchEcho = false;
		let sawHiddenBranchSubcommands = false;
		const runCliAndExitOptions: IRunCliAndExitOptions = {
			args: ['--help'],
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

		await runCliAndExit(branchHidingCli, runCliAndExitOptions);
		expect(sawHiddenBranchEcho).toBe(false);
		expect(sawHiddenBranchSubcommands).toBe(false);
		expect(sawNonHiddenBranchEcho).toBe(true);

		runCliAndExitOptions.args = [hiddenBranch.name, '--help'];
		await runCliAndExit(branchHidingCli, runCliAndExitOptions);
		expect(sawHiddenBranchSubcommands).toBe(true);
	});
});
