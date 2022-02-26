import { CliCommandGroup } from '@carnesen/cli';
import {
	advancedCommandGroup,
	multiplyCommand,
	echoCommand,
	echoPizzaCommand,
	throwErrorCommand,
	parseJsonCommand,
	ansiEchoCommand,
} from '@carnesen/cli-examples';

import { showCommand } from './show-command';
import { docsCommand } from './docs-command';
import { bold } from './util';

/**
 * Root of the @carnesen/cli website examples CLI
 */
export const rootCommandGroup = CliCommandGroup({
	name: 'cli',
	description: `
		This is ${bold('@carnesen/cli')} examples running in your browser console.`,
	subcommands: [
		docsCommand,
		echoCommand as any,
		multiplyCommand,
		showCommand,
		throwErrorCommand,
		advancedCommandGroup,
	],
});

/**
 * Initial command-line history for the examples terminal
 */
export const INITIAL_HISTORY = [
	advancedCommandGroup.name,
	`${advancedCommandGroup.name} ${echoPizzaCommand.name} --pizza`,
	`${advancedCommandGroup.name} ${echoPizzaCommand.name} pizza`,
	`${advancedCommandGroup.name} ${echoPizzaCommand.name} --help`,
	`${advancedCommandGroup.name} ${parseJsonCommand.name} '{"foo": "bar", "count": 3}'`,
	`${advancedCommandGroup.name} ${parseJsonCommand.name} '["foo", 2, true]'`,
	`${advancedCommandGroup.name} ${ansiEchoCommand.name} foo bar baz --blue`,
	`${throwErrorCommand.name} --message "Oh no!" --kind terse`,
	`${throwErrorCommand.name} --message "Oh no!"`,
	`${multiplyCommand.name} 2 3 4`,
	`${showCommand.name} show`,
	`${showCommand.name} echo`,
	'asdf',
	`${echoCommand.name} foo bar baz`,
	`history`,
	`${docsCommand.name}`,
];
