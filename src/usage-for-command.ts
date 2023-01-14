import { wrapInSquareBrackets } from './wrap-in-square-brackets';
import { reWrapText } from './re-wrap-text';
import { TwoColumnTable, TwoColumnTableRow } from './two-column-table';
import {
	renderCCliDescription,
	RenderCCliDescriptionOptions,
} from './c-cli-description';
import { CCliLeaf } from './c-cli-tree';
import { UsageOptions } from './usage-options';

export function usageForCommand(
	leaf: CCliLeaf,
	options: UsageOptions,
): string[] {
	const { current, parents } = leaf;
	const { columns, indentation, color } = options;
	const {
		positionalArgGroup,
		namedArgGroups,
		doubleDashArgGroup,
		description,
	} = current;
	const commandPathString = [...parents, current]
		.map(({ name }) => name)
		.join(' ');

	let firstLine = `Usage: ${commandPathString}`;
	const lines: string[] = [];

	const descriptionInput: RenderCCliDescriptionOptions = { color };
	const commandDescriptionText: string = renderCCliDescription(
		description,
		descriptionInput,
	);

	const twoColumnTableOptions = {
		columns,
		indentation,
	};

	const commandDescriptionLines = reWrapText(
		commandDescriptionText,
		twoColumnTableOptions,
	);

	if (commandDescriptionLines.length > 0) {
		lines.push(...commandDescriptionLines);
		lines.push('');
	}

	if (positionalArgGroup && !positionalArgGroup.hidden) {
		if (positionalArgGroup.optional) {
			firstLine += ` ${wrapInSquareBrackets(positionalArgGroup.placeholder)}`;
		} else {
			firstLine += ` ${positionalArgGroup.placeholder}`;
		}
		const positionalArgGroupDescriptionText = renderCCliDescription(
			positionalArgGroup.description,
			descriptionInput,
		);

		lines.push('Positional arguments:');
		lines.push('');
		lines.push(
			...TwoColumnTable(
				[[positionalArgGroup.placeholder, positionalArgGroupDescriptionText]],
				twoColumnTableOptions,
			),
		);
		lines.push('');
	}

	if (namedArgGroups) {
		const namedArgGroupEntries = Object.entries(namedArgGroups).filter(
			([_, argGroup]) => !argGroup.hidden,
		);
		if (namedArgGroupEntries.length > 0) {
			const namedArgGroupsAllOptional = namedArgGroupEntries.every(
				([_, argGroup]) => argGroup.optional,
			);
			firstLine += namedArgGroupsAllOptional
				? ' [<named args>]'
				: ' <named args>';
			lines.push('Named arguments:');
			lines.push('');
			const rows: TwoColumnTableRow[] = namedArgGroupEntries.map(
				([name, argGroup]) => {
					const argGroupDescriptionText = renderCCliDescription(
						argGroup.description,
						descriptionInput,
					);
					let cell0 = `--${name}`;
					if (argGroup.placeholder) {
						cell0 += ` ${argGroup.placeholder}`;
					}
					if (argGroup.optional) {
						cell0 = wrapInSquareBrackets(cell0);
					}
					return [cell0, argGroupDescriptionText];
				},
			);

			lines.push(...TwoColumnTable(rows, twoColumnTableOptions));
			lines.push('');
		}
	}

	if (doubleDashArgGroup && !doubleDashArgGroup.hidden) {
		const { placeholder, optional } = doubleDashArgGroup;
		const fullPlaceholder = `-- ${placeholder}`;
		firstLine += ` ${
			optional ? wrapInSquareBrackets(fullPlaceholder) : fullPlaceholder
		}`;
		lines.push('"Double dash" arguments:');
		lines.push('');
		lines.push(
			...TwoColumnTable(
				[
					[
						placeholder,
						renderCCliDescription(
							doubleDashArgGroup.description,
							descriptionInput,
						),
					],
				],
				twoColumnTableOptions,
			),
		);
	}

	return [firstLine, '', ...lines];
}
