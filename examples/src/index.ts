import { CliBranch } from '@carnesen/cli';
import { echo } from './echo';
import { multiply } from './multiply';
import { throwSpecialError } from './throw-special-error';
import { echoAsHiddenCommand } from './hidden-command';
import { hiddenBranch } from './hidden-branch';

export const examples = CliBranch({
	name: 'examples',
	description: `
	Examples that demonstrate @carnesen/cli features
	`,
	children: [
		echo,
		echoAsHiddenCommand,
		hiddenBranch,
		multiply,
		throwSpecialError,
	],
});
