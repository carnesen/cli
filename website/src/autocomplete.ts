import { CLI_COMMAND, TCliRoot, CLI_BRANCH, ICliArgGroup } from '@carnesen/cli';
import { findCliTree } from '@carnesen/cli/lib/find-cli-tree';

import { LongestLeadingSubstring } from './longest-leading-substring';

/**
 *
 * @param root The root of the command tree for which to autocomplete
 * @param args The arguments on the command line before the current word
 * @param search The current word on the command line
 * @returns Completions for the provided search word
 */
export function autocomplete(
	root: TCliRoot,
	args: string[],
	search: string,
): string[] {
	if (args.includes('--help')) {
		return [];
	}
	const tree = findCliTree(root, args);
	switch (tree.current.kind) {
		case CLI_BRANCH: {
			if (tree.args.length > 0) {
				// findCliTree stopped at a branch with args still remaining.
				// There's no way for us to autocomplete from that state.
				return [];
			}

			const subcommandNames = tree.current.subcommands.map(({ name }) => name);
			return autocompleteFromWordList([...subcommandNames], search);
		}

		case CLI_COMMAND: {
			// E.g. The command line was "cloud users list --all --v"

			// E.g. The command invoked e.g. "listCommand"
			const command = tree.current;

			// E.g. ["--all", "--verbose", "--version", "--help"]
			const namedArgGroupSeparators = [
				...(command.namedArgGroups
					? Object.keys(command.namedArgGroups).map((name) => `--${name}`)
					: []),
				'--help',
			];

			// The argument _before_ the search term
			const previousArg = tree.args.slice(-1)[0];

			// This is perhaps an obscure sub-case to start with, but if the previous
			// arg is "--", we can be sure we are currently searching at the start of
			// the "escaped" argument group e.g. "cloud users list -- "
			if (previousArg === '--') {
				// We are in the escaped arg group
				return autocompleteArgGroup(tree.current.escapedArgGroup, [], search);
			}

			// Otherwise if there's a "--" but we're not at the start of the argument
			// group, just give up e.g. "cloud users list -- chris "
			if (tree.args.includes('--')) {
				return [];
			}
			// Now we know we are NOT in the escaped args group

			// E.g. "cloud users list -" or "cloud users list --"
			if (search === '-' || search === '--') {
				const suggestions: string[] = [];
				if (command.escapedArgGroup) {
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
			if (tree.args.length === 0) {
				const { positionalArgGroup } = command;
				const completions = autocompleteArgGroup(
					positionalArgGroup,
					[],
					search,
				);

				if (positionalArgGroup && positionalArgGroup.required) {
					return completions;
				}

				const suggestions: string[] = [];
				if (search === '') {
					if (command.escapedArgGroup) {
						suggestions.push('--');
					}
					suggestions.push(...namedArgGroupSeparators);
					return [...suggestions, ...completions];
				}
				return completions;
			}

			// E.g. "cloud users list --email chr"
			if (previousArg.startsWith('--')) {
				if (!tree.current.namedArgGroups) {
					return [];
				}
				// OK if undefined
				const argGroup: ICliArgGroup | undefined =
					tree.current.namedArgGroups[previousArg.slice(2)];
				return autocompleteArgGroup(argGroup, [], search);
			}

			// All known completions have been exhausted
			return [];
		}

		default: {
			throw new Error('Unexpected kind');
		}
	}
}

function autocompleteArgGroup(
	argGroup: ICliArgGroup | undefined,
	args: string[],
	search: string,
): string[] {
	if (!argGroup) {
		return [];
	}
	const { _suggest } = argGroup;
	if (_suggest) {
		return autocompleteFromWordList(_suggest(args, search), search);
	}
	// Nothing else we can do
	return [];
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
			const longestLeadingSubstring = LongestLeadingSubstring(candidates);
			if (longestLeadingSubstring.length > 0) {
				// We found a refinement autocompletion
				return [longestLeadingSubstring];
			}
			// Return the candidates and let the caller decide what to do
			return candidates;
		}
	}
}
