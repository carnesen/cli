import {
	multiplyCommand,
	echoCommand,
	echoPizzaCommand,
	throwErrorCommand,
	parseJsonCommand,
	ansiEchoCommand,
} from '@carnesen/cli-examples';
import { c } from '@carnesen/cli';

import { docsCommand } from './docs-command';

import { HISTORY_COMMAND_NAME } from './history-command';

const SHOW_COMMAND_NAME = 'show';
/**
 * A command for showing the source code of other commands
 */
export const showCommand = c.command({
	name: SHOW_COMMAND_NAME,
	description: 'Show the source code of a command',
	positionalArgGroup: c.stringChoice({
		choices: [
			'.',
			docsCommand.name,
			echoCommand.name,
			ansiEchoCommand.name,
			echoPizzaCommand.name,
			HISTORY_COMMAND_NAME,
			multiplyCommand.name,
			parseJsonCommand.name,
			SHOW_COMMAND_NAME,
			throwErrorCommand.name,
		],
		placeholder: '<command>',
	}),
	action({ positionalValue: name }) {
		let url: string;
		switch (name) {
			case echoCommand.name:
			case ansiEchoCommand.name:
			case echoPizzaCommand.name:
			case multiplyCommand.name:
			case parseJsonCommand.name:
			case throwErrorCommand.name: {
				url = `https://github.com/carnesen/cli/blob/master/packages/cli-examples/src/${name}-command.ts`;
				break;
			}
			case '.': {
				url = `https://github.com/carnesen/cli/blob/master/packages/cli-website/src/root-command-group.ts`;
				break;
			}
			case docsCommand.name:
			case HISTORY_COMMAND_NAME:
			case SHOW_COMMAND_NAME: {
				url = `https://github.com/carnesen/cli/blob/master/packages/cli-website/src/${name}-command.ts`;
				break;
			}
			default: {
				throw new Error('Unexpected command');
			}
		}
		// Set tab size in GitHub rendering
		const fullUrl = `${url}?ts=3`;
		window.location.assign(fullUrl);
		return `Navigating to ${fullUrl}`;
	},
});
