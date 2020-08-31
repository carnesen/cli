import { CliCommandGroup, CliWordMark } from '@carnesen/cli';

import { echoCommand } from './echo-command';
import { multiplyCommand } from './multiply-command';
import { throwErrorCommand } from './throw-error-command';
import { advancedCommandGroup } from './advanced-command-group';

/**
 * Root of the @carnesen/cli-examples command tree
 * */
export const rootCommandGroup = CliCommandGroup({
	name: 'carnesen-cli-examples',
	description({ ansi }) {
		return `Examples that demonstrate ${CliWordMark({ ansi })} features`;
	},
	subcommands: [
		echoCommand,
		multiplyCommand,
		throwErrorCommand,
		advancedCommandGroup,
	],
});
