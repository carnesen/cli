import { CliCommandGroup } from '@carnesen/cli';
import { hidingCommandGroup } from './hiding-command-group';
import { demoDoubleDashArgumentsCommand } from './demo-double-dash-arguments-command';
import { parseJsonCommand } from './parse-json-command';
import { ansiEchoCommand } from './ansi-echo-command';

export const advancedCommandGroup = CliCommandGroup({
	name: 'advanced',
	description({ ansi }) {
		return `
		Examples of advanced ${ansi.bold('@carnesen/cli')} features
	`;
	},
	subcommands: [
		ansiEchoCommand,
		demoDoubleDashArgumentsCommand,
		hidingCommandGroup,
		parseJsonCommand,
	],
});
