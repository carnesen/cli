import { CliBranch } from '@carnesen/cli';
import {
	advancedBranch,
	multiplyCommand,
	echoCommand,
	echoPizzaCommand,
	throwErrorCommand,
	parseJsonCommand,
} from '@carnesen/cli-examples';

import { showCommand } from './show-command';
import { docsCommand } from './docs-command';
import { bold } from './util';

/**
 * Root of the @carnesen/cli website examples CLI
 */
export const rootBranch = CliBranch({
	name: 'cli',
	description: `
		This is ${bold('@carnesen/cli')} examples running in your browser console.`,
	subcommands: [
		docsCommand,
		echoCommand,
		multiplyCommand,
		showCommand,
		throwErrorCommand,
		advancedBranch,
	],
});

/**
 * Initial command-line history for the examples terminal
 */
export const INITIAL_HISTORY = [
	advancedBranch.name,
	`${advancedBranch.name} ${echoPizzaCommand.name} --pizza`,
	`${advancedBranch.name} ${echoPizzaCommand.name} pizza`,
	`${advancedBranch.name} ${echoPizzaCommand.name} --help`,
	`${advancedBranch.name} ${parseJsonCommand.name} '{"foo": "bar", "count": 3}'`,
	`${advancedBranch.name} ${parseJsonCommand.name} '["foo", 2, true]'`,
	`${throwErrorCommand.name} --message "Oh no!" --kind terse`,
	`${throwErrorCommand.name} --message "Oh no!"`,
	`${multiplyCommand.name} 2 3 4`,
	`${showCommand.name} show`,
	`${showCommand.name} echo`,
	`${docsCommand.name}`,
	'asdf',
	`${echoCommand.name} foo bar baz`,
	`history`,
];
