import {
	Cli,
	CliBranch,
	runCliAndExit,
	IRunCliAndExitOptions,
} from '@carnesen/cli';

import { echoHiddenCommand } from '.';

const BRANCH_WITH_ECHO_AS_HIDDEN_SUBCOMMAND =
	'branch-with-echo-as-hidden-subcommand';

describe(echoHiddenCommand.name, () => {
	it('behaves like normal echo', async () => {
		const echoAsHidden = Cli(echoHiddenCommand);
		expect(await echoAsHidden('foo')).toBe('foo');
	});

	it('only shows up in usage if specifically requested via --help', async () => {
		const cli = Cli(CliBranch({ name: '', subcommands: [echoHiddenCommand] }));
		let sawHiddenCommandNameInUsage = false;
		const runCliAndExitOptions: IRunCliAndExitOptions = {
			args: ['--help'],
			processExit() {},
			consoleError(arg) {
				if (typeof arg === 'string' && arg.includes(echoHiddenCommand.name)) {
					sawHiddenCommandNameInUsage = true;
				}
			},
			consoleLog() {},
		};

		await runCliAndExit(cli, runCliAndExitOptions);
		expect(sawHiddenCommandNameInUsage).toBe(false);

		// This is a bit hacky, but let's just mutate the options object
		runCliAndExitOptions.args = [echoHiddenCommand.name, '--help'];
		await runCliAndExit(cli, runCliAndExitOptions);
		expect(sawHiddenCommandNameInUsage).toBe(true);
	});
});
