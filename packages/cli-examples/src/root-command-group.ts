import { c, CCliWordMark } from '@carnesen/cli';

import { echoCommand } from './echo-command';
import { multiplyCommand } from './multiply-command';
import { throwErrorCommand } from './throw-error-command';
import { advancedCommandGroup } from './advanced-command-group';

/** Root of the @carnesen/cli-examples command tree */
export const rootCommandGroup = c.commandGroup({
	name: 'carnesen-cli-examples',
	description(input) {
		return `Examples that demonstrate ${CCliWordMark(input)} features`;
	},
	subcommands: [
		echoCommand,
		multiplyCommand,
		throwErrorCommand,
		advancedCommandGroup,
	],
});
