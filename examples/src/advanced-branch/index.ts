import { CliBranch } from '@carnesen/cli';
import { hidingBranch } from '../hiding-branch';
import { demoEscapedArgumentsCommand } from '../demo-escaped-arguments-command';

export const advancedBranch = CliBranch({
	name: 'advanced',
	description: `
		Examples of advanced @carnesen/cli features
	`,
	subcommands: [demoEscapedArgumentsCommand, hidingBranch],
});
