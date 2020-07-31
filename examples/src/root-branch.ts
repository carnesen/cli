import { CliBranch } from '@carnesen/cli';

import { echoCommand } from './echo-command';
import { multiplyCommand } from './multiply-command';
import { throwErrorCommand } from './throw-error-command';
import { advancedBranch } from './advanced-branch';
import { CarnesenCliWordMark } from './carnesen-cli-word-mark';

/**
 * Root of the @carnesen/cli-examples command tree
 * */
export const rootBranch = CliBranch({
	name: 'carnesen-cli-examples',
	description({ ansi }) {
		return `Examples that demonstrate ${CarnesenCliWordMark(ansi)} features`;
	},
	subcommands: [
		echoCommand,
		multiplyCommand,
		throwErrorCommand,
		advancedBranch,
	],
});
