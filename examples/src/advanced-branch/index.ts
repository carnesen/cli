import { CliBranch } from '@carnesen/cli';
import { hidingBranch } from '../hiding-branch';
import { demoDoubleDashArgumentsCommand } from '../demo-double-dash-arguments-command';
import { parseJsonCommand } from '../parse-json-command';

export const advancedBranch = CliBranch({
	name: 'advanced',
	description: `
		Examples of advanced @carnesen/cli features
	`,
	subcommands: [demoDoubleDashArgumentsCommand, hidingBranch, parseJsonCommand],
});
