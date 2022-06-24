import { c, CCliOptions } from '@carnesen/cli';

import { echoHiddenCommand } from '../echo-hidden-command';

describe(echoHiddenCommand.name, () => {
	it('behaves like normal echo', async () => {
		const echoAsHidden = c.cli(echoHiddenCommand);
		expect(await echoAsHidden.api(['foo'])).toBe('foo');
	});

	it('only shows up in usage if specifically requested via --help', async () => {
		let sawHiddenCommandNameInUsage = false;
		const options: CCliOptions = {
			done() {},
			logger: {
				error(arg) {
					if (typeof arg === 'string' && arg.includes(echoHiddenCommand.name)) {
						sawHiddenCommandNameInUsage = true;
					}
				},
				log() {},
			},
		};
		const root = c.commandGroup({
			name: '',
			subcommands: [echoHiddenCommand],
		});
		const cli = c.cli(root, options);
		await cli.run(['--help']);
		expect(sawHiddenCommandNameInUsage).toBe(false);

		await cli.run([echoHiddenCommand.name, '--help']);
		expect(sawHiddenCommandNameInUsage).toBe(true);
	});
});
