import { CliBranch } from '@carnesen/cli';

import { echoCommand } from './echo-command';
import { multiplyCommand } from './multiply-command';
import { throwErrorCommand } from './throw-error-command';
import { advancedBranch } from './advanced-branch';

/**
 * Root of the @carnesen/cli-examples command tree
 * */
export const rootBranch = CliBranch({
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
