import { c, CCliWordMark } from '@carnesen/cli';
import { hidingCommandGroup } from './hiding-command-group';
import { demoDoubleDashArgumentsCommand } from './demo-double-dash-arguments-command';
import { parseJsonCommand } from './parse-json-command';
import { echoWithColorCommand } from './echo-with-color-command';

export const advancedCommandGroup = c.commandGroup({
	name: 'advanced',
	description(input) {
		return `
		Examples of advanced ${CCliWordMark(input)} features
	`;
	},
	subcommands: [
		echoWithColorCommand,
		demoDoubleDashArgumentsCommand,
		hidingCommandGroup,
		parseJsonCommand,
	],
});
