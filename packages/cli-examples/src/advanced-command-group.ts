import { CliCommandGroup, CliWordMark } from '@carnesen/cli';
import { hidingCommandGroup } from './hiding-command-group';
import { demoDoubleDashArgumentsCommand } from './demo-double-dash-arguments-command';
import { parseJsonCommand } from './parse-json-command';
import { echoWithColorCommand } from './echo-with-color-command';

export const advancedCommandGroup = CliCommandGroup({
	name: 'advanced',
	description(input) {
		return `
		Examples of advanced ${CliWordMark(input)} features
	`;
	},
	subcommands: [
		echoWithColorCommand,
		demoDoubleDashArgumentsCommand,
		hidingCommandGroup,
		parseJsonCommand,
	],
});
