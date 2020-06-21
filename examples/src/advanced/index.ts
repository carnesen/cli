import { CliBranch } from '@carnesen/cli';
import { echoAsHiddenCommand } from './echo-as-hidden-command';
import { hiddenBranch } from './hidden-branch';
import { echoWithHiddenOption } from './echo-with-hidden-option';
import { demoEscapedArguments } from './demo-escaped';

export const advanced = CliBranch({
	name: 'advanced',
	description: `
	Examples of advanced @carnesen/cli features. This is a hidden branch!
	`,
	hidden: true,
	subcommands: [
		demoEscapedArguments,
		echoWithHiddenOption,
		echoAsHiddenCommand,
		hiddenBranch,
	],
});
