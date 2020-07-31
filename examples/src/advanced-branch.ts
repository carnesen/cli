import { CliBranch } from '@carnesen/cli';
import { hidingBranch } from './hiding-branch';
import { demoDoubleDashArgumentsCommand } from './demo-double-dash-arguments-command';
import { parseJsonCommand } from './parse-json-command';
import { ansiEchoCommand } from './ansi-echo-command';

export const advancedBranch = CliBranch({
	name: 'advanced',
	description({ ansi }) {
		return `
		Examples of advanced ${ansi.bold('@carnesen/cli')} features
	`;
	},
	subcommands: [
		ansiEchoCommand,
		demoDoubleDashArgumentsCommand,
		hidingBranch,
		parseJsonCommand,
	],
});
