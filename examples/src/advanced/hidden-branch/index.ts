import { CliBranch, runCliAndExit, Cli } from '@carnesen/cli';
import { echo } from '../../echo';

const normalBranch = CliBranch({
	name: 'normal-branch',
	description: `
    This is a normal non-hidden command branch.
    Its "description" shows up in command usage docs.`,
	subcommands: [echo],
});

// Exported for unit testing
export const HIDDEN_BRANCH = 'hidden-branch';

export const hiddenBranch = CliBranch({
	name: HIDDEN_BRANCH,
	description: `
    This is a command branch that has hidden=true.
    It does not show up in the list of "subcommands",
    but it is otherwise fully functional.`,
	hidden: true,
	subcommands: [echo],
});

const branch = CliBranch({
	name: 'cli',
	description: `This CLI has a hidden branch called "${HIDDEN_BRANCH}.`,
	subcommands: [normalBranch, hiddenBranch],
});

// Exported for unit testing
export const cli = Cli(branch);

if (module === require.main) {
	runCliAndExit(cli);
}
