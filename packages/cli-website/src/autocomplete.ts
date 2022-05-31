import {
	CCliArgGroup,
	CCliCommand,
	CCliCommandGroup,
	CCliRoot,
	navigateCCliTree,
} from '@carnesen/cli';

import { findLongestLeadingSubstring } from './find-longest-leading-substring';

/**
 * @param root The root of the command tree for which to autocomplete
 * @param args The arguments on the command line before the current word
 * @param search The current word on the command line
 * @returns Completions for the provided search word
 */
export function autocomplete(
	root: CCliRoot,
	args: string[],
	search: string,
): string[] {
	if (args.includes('--help')) {
		return [];
	}
	const navigated = navigateCCliTree(root, args);

	if (navigated.tree.current instanceof CCliCommandGroup) {
		if (navigated.args.length > 0) {
			// navigateCommandTree stopped at a branch with args still remaining.
			// There's no way for us to autocomplete from that state.
			return [];
		}

		const subcommandNames = navigated.tree.current.subcommands.map(
			({ name }) => name,
		);
		return autocompleteFromWordList([...subcommandNames], search);
	}

	if (navigated.tree.current instanceof CCliCommand) {
		// E.g. The command line was "cloud users list --all --v"

		// E.g. The command invoked e.g. "listCommand"
		const command = navigated.tree.current;

		// E.g. ["--all", "--verbose", "--version", "--help"]
		const namedArgGroupSeparators = [
			...(command.namedArgGroups
				? Object.keys(command.namedArgGroups).map((name) => `--${name}`)
				: []),
			'--help',
		];

		// The argument _before_ the search term
		const previousArg = navigated.args.slice(-1)[0];

		// This is perhaps an obscure sub-case to start with, but if the previous
		// arg is "--", we can be sure we are currently searching at the start of
		// the "double dash" argument group e.g. "cloud users list -- "
		if (previousArg === '--') {
			// We are in the double-dash arg group
			return autocompleteArgGroup(
				navigated.tree.current.doubleDashArgGroup,
				[],
				search,
			);
		}

		// Otherwise if there's a "--" but we're not at the start of the argument
		// group, just give up e.g. "cloud users list -- chris "
		if (navigated.args.includes('--')) {
			return [];
		}
		// Now we know we are NOT in the double-dash args group

		// E.g. "cloud users list -" or "cloud users list --"
		if (search === '-' || search === '--') {
			const suggestions: string[] = [];
			if (command.doubleDashArgGroup) {
				suggestions.push('--');
			}
			suggestions.push(...namedArgGroupSeparators);
			return autocompleteFromWordList(suggestions, search);
		}

		// E.g. "cloud users list --em"
		if (search.startsWith('--')) {
			return autocompleteFromWordList(namedArgGroupSeparators, search);
		}

		// We are AT a command e.g. "cloud users list "
		if (navigated.args.length === 0) {
			const { positionalArgGroup } = command;
			const completions = autocompleteArgGroup(positionalArgGroup, [], search);

			if (positionalArgGroup && !positionalArgGroup.optional) {
				return completions;
			}

			const suggestions: string[] = [];
			if (search === '') {
				if (command.doubleDashArgGroup) {
					suggestions.push('--');
				}
				suggestions.push(...namedArgGroupSeparators);
				return [...suggestions, ...completions];
			}
			return completions;
		}

		// E.g. "cloud users list --email chr"
		if (previousArg.startsWith('--')) {
			if (!navigated.tree.current.namedArgGroups) {
				return [];
			}
			// OK if undefined
			const argGroup: CCliArgGroup | undefined =
				navigated.tree.current.namedArgGroups[previousArg.slice(2)];
			return autocompleteArgGroup(argGroup, [], search);
		}

		// All known completions have been exhausted
		return [];
	}
	throw new Error('Unexpected kind');
}

function autocompleteArgGroup(
	argGroup: CCliArgGroup | undefined,
	args: string[],
	search: string,
): string[] {
	if (!argGroup) {
		return [];
	}
	return autocompleteFromWordList(argGroup._suggest(args, search), search);
}

function autocompleteFromWordList(words: string[], search: string): string[] {
	const candidates = words
		.filter((word) => word.startsWith(search))
		.map((word) => word.slice(search.length));

	switch (candidates.length) {
		case 0: {
			// They're on their own
			return [];
		}
		case 1: {
			// The search term matches just one candidate. Auto-complete the whole
			// command name and put a space too to start the next arg.
			return [`${candidates[0]} `];
		}
		default: {
			// First try to autocomplete the longest leading substring
			const longestLeadingSubstring = findLongestLeadingSubstring(candidates);
			if (longestLeadingSubstring.length > 0) {
				// We found a refinement autocompletion
				return [longestLeadingSubstring];
			}
			// Return the candidates and let the caller decide what to do
			return candidates;
		}
	}
}
