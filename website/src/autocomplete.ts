import { CLI_COMMAND, TCliRoot, CLI_BRANCH, ICliArgGroup } from '@carnesen/cli';
import { findCliNode } from '@carnesen/cli/lib/find-cli-node';

import { LongestLeadingSubstring } from './longest-leading-substring';

export function autocomplete(
	root: TCliRoot,
	args: string[],
	search: string,
): string[] {
	const node = findCliNode(root, args);
	switch (node.current.kind) {
		case CLI_BRANCH: {
			if (node.args.length > 0) {
				// findCliNode stopped at a branch node with args still remaining. That
				// either means --help or bad command.
				return [];
			}

			const subcommandNames = node.current.subcommands.map(({ name }) => name);
			return autocompleteFromWordList(subcommandNames, search);
		}

		case CLI_COMMAND: {
			// We are at or past a command e.g. "cloud users list --all".
			const command = node.current;
			const namedArgGroupSeparators = command.namedArgGroups
				? Object.keys(command.namedArgGroups).map((name) => `--${name}`)
				: [];
			const lastArg = node.args.slice(-1)[0];
			// This is perhaps an obscure sub-case to start with, but if the last arg
			// is "--", we can be sure we are currently searching at the start of the
			// "escaped" argument group.
			if (lastArg === '--') {
				// We are in the escaped arg group
				return autocompleteArgGroup(node.current.escapedArgGroup, [], search);
			}

			// Otherwise if there's a "--" but we're not at the start of the argument
			// group, just give up.
			if (node.args.includes('--')) {
				return [];
			}
			// Now we know we are NOT in the escaped args group

			if (search === '-' || search === '--') {
				const words: string[] = [];
				if (command.escapedArgGroup) {
					words.push('--');
				}
				words.push(...namedArgGroupSeparators);
				return autocompleteFromWordList(words, search);
			}

			if (search.startsWith('--')) {
				if (!node.current.namedArgGroups) {
					return [];
				}
				return autocompleteFromWordList(
					Object.keys(node.current.namedArgGroups),
					search.slice(2),
				);
			}

			if (node.args.length === 0) {
				// We are AT a command e.g. "cloud users list "
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

			if (lastArg.startsWith('--')) {
				if (!node.current.namedArgGroups) {
					return [];
				}
				const argGroup = node.current.namedArgGroups[lastArg.slice(2)];
				return autocompleteArgGroup(argGroup, [], search);
			}

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
	if (words.length === 0) {
		return [];
	}
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
