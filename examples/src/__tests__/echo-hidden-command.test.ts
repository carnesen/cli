import { Cli, CliBranch, ICliOptions } from '@carnesen/cli';

import { echoHiddenCommand } from '../echo-hidden-command';

const BRANCH_WITH_ECHO_AS_HIDDEN_SUBCOMMAND =
	'branch-with-echo-as-hidden-subcommand';

describe(echoHiddenCommand.name, () => {
	it('behaves like normal echo', async () => {
		const echoAsHidden = Cli(echoHiddenCommand);
		expect(await echoAsHidden.api(['foo'])).toBe('foo');
	});

	it('only shows up in usage if specifically requested via --help', async () => {
		let sawHiddenCommandNameInUsage = false;
		const options: ICliOptions = {
			done() {},
			console: {
				error(arg) {
					if (typeof arg === 'string' && arg.includes(echoHiddenCommand.name)) {
						sawHiddenCommandNameInUsage = true;
					}
				},
				log() {},
			},
		};
		const root = CliBranch({ name: '', subcommands: [echoHiddenCommand] });
		const cli = Cli(root, options);
		await cli.run(['--help']);
		expect(sawHiddenCommandNameInUsage).toBe(false);

		await cli.run([echoHiddenCommand.name, '--help']);
		expect(sawHiddenCommandNameInUsage).toBe(true);
	});
});
