import { CliBranch } from '@carnesen/cli';
import { echo } from './echo';
import { multiply } from './multiply';
import { throwError } from './throw-error';
import { echoAsHiddenCommand } from './echo-as-hidden-command';
import { hiddenBranch } from './hidden-branch';
import { echoWithHiddenOption } from './echo-with-hidden-option';
import { demoEscapedArguments } from './demo-escaped';

export const examples = CliBranch({
	name: 'examples',
	description: `
	Examples that demonstrate @carnesen/cli features
	`,
	children: [
		demoEscapedArguments,
		echo,
		echoWithHiddenOption,
		echoAsHiddenCommand,
		hiddenBranch,
		multiply,
		throwError,
	],
});
