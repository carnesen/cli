import { Cli, ICliOptions } from '@carnesen/cli';
import {
	hidingCommandGroup,
	hiddenCommandGroup,
	nonHiddenCommandGroup,
} from '../hiding-command-group';
import { echoCommand } from '../echo-command';
import { echoHiddenCommand } from '../echo-hidden-command';

describe(hidingCommandGroup.name, () => {
	it(`has a hidden command ${echoHiddenCommand.name}`, async () => {
		const cli = Cli(hidingCommandGroup);
		expect(await cli.api([echoHiddenCommand.name, 'foo'])).toBe('foo');
	});

	it(`only shows usage for commands in hidden command groups if they're navigated to`, async () => {
		let sawHiddenCommandGroupEcho = false;
		let sawNonHiddenCommandGroupEcho = false;
		let sawHiddenCommandGroupSubcommands = false;
		const options: ICliOptions = {
			done() {},
			console: {
				error(arg) {
					if (typeof arg === 'string') {
						if (
							arg.includes(`${hiddenCommandGroup.name} ${echoCommand.name}`)
						) {
							sawHiddenCommandGroupEcho = true;
						}
						if (
							arg.includes(`${nonHiddenCommandGroup.name} ${echoCommand.name}`)
						) {
							sawNonHiddenCommandGroupEcho = true;
						}
						if (arg.includes(`${hiddenCommandGroup.name} <subcommand>`)) {
							sawHiddenCommandGroupSubcommands = true;
						}
					}
				},
				log() {},
			},
		};

		const cli = Cli(hidingCommandGroup, options);
		await cli.run(['--help']);
		expect(sawHiddenCommandGroupEcho).toBe(false);
		expect(sawHiddenCommandGroupSubcommands).toBe(false);
		expect(sawNonHiddenCommandGroupEcho).toBe(true);

		await cli.run([hiddenCommandGroup.name, '--help']);
		expect(sawHiddenCommandGroupSubcommands).toBe(true);
	});
});
