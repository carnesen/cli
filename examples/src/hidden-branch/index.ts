import { CliBranch, runCliAndExit } from '@carnesen/cli';
import { echo } from '../echo';

const normalBranch = CliBranch({
	name: 'non-hidden',
	description: `
    This is a normal non-hidden command branch.
    Its "description" shows up in command usage docs.`,
	children: [echo],
});

const hiddenBranch = CliBranch({
	name: 'secret',
	description: `
    This is a command branch that has hidden=true.
    It does not show up in the list of "children",
    but it is otherwise fully functional.`,
	hidden: true,
	children: [echo],
});

export const rootBranch = CliBranch({
	name: 'cli',
	description: 'This CLI has a hidden branch called "secret".',
	children: [normalBranch, hiddenBranch],
});

if (module === require.main) {
	runCliAndExit(rootBranch);
}
