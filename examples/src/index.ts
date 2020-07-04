/**
 * Main export of the @carnesen/cli-examples package
 */

import { CliBranch } from '@carnesen/cli';
import { echoCommand } from './echo-command';
import { multiplyCommand } from './multiply-command';
import { throwErrorCommand } from './throw-error-command';
import { advancedBranch } from './advanced-branch';

/**
 * Root of the @carnesen/cli-examples command tree
 * */
export const carnesenCliExamplesBranch = CliBranch({
	name: 'carnesen-cli-examples',
	description: `
		Examples that demonstrate @carnesen/cli features
	`,
	subcommands: [
		echoCommand,
		multiplyCommand,
		throwErrorCommand,
		advancedBranch,
	],
});
