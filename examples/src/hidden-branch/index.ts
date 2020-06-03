#!/usr/bin/env node
import { CliBranch, runCliAndExit } from '@carnesen/cli';
import { echo } from '../echo';

const normalBranch = CliBranch({
	name: 'non-hidden',
	description: `
    This is a normal non-hidden command branch.
    Its "description" shows up in command usage docs.`,
	subcommands: [echo],
});

const hiddenBranch = CliBranch({
	name: 'secret',
	description: `
    This is a command branch that has hidden=true.
    It does not show up in the list of "subcommands",
    but it is otherwise fully functional.`,
	hidden: true,
	subcommands: [echo],
});

export const rootBranch = CliBranch({
	name: 'cli',
	description:
		'This CLI has a hidden branch called "secret".',
	subcommands: [normalBranch, hiddenBranch],
});

if (module === require.main) {
	runCliAndExit(rootBranch);
}
