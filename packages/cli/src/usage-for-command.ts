import { wrapInSquareBrackets } from './util';
import { reWrapText } from './re-wrap-text';
import { TwoColumnTable, TwoColumnTableRow } from './two-column-table';
import {
	textFromDescription,
	CCliDescriptionFunctionInput,
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
	} = current.options;
	const commandPathString = [...parents, current]
		.map(({ options: { name } }) => name)
		.join(' ');

	let firstLine = `Usage: ${commandPathString}`;
	const lines: string[] = [];

	const descriptionInput: CCliDescriptionFunctionInput = { ansi: color, color };
	const commandDescriptionText: string = textFromDescription(
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

	if (positionalArgGroup && !positionalArgGroup.options.hidden) {
		if (positionalArgGroup.options.required) {
			firstLine += ` ${positionalArgGroup.options.placeholder}`;
		} else {
			firstLine += ` ${wrapInSquareBrackets(
				positionalArgGroup.options.placeholder,
			)}`;
		}
		const positionalArgGroupDescriptionText = textFromDescription(
			positionalArgGroup.options.description,
			descriptionInput,
		);

		lines.push('Positional arguments:');
		lines.push('');
		lines.push(
			...TwoColumnTable(
				[
					[
						positionalArgGroup.options.placeholder,
						positionalArgGroupDescriptionText,
					],
				],
				twoColumnTableOptions,
			),
		);
		lines.push('');
	}

	if (namedArgGroups) {
		const namedArgGroupEntries = Object.entries(namedArgGroups).filter(
			([_, argGroup]) => !argGroup.options.hidden,
		);
		if (namedArgGroupEntries.length > 0) {
			const namedArgGroupsNotRequired = namedArgGroupEntries.every(
				([_, argGroup]) => !argGroup.options.required,
			);
			firstLine += namedArgGroupsNotRequired
				? ' [<named args>]'
				: ' <named args>';
			lines.push('Named arguments:');
			lines.push('');
			const rows: TwoColumnTableRow[] = namedArgGroupEntries.map(
				([name, argGroup]) => {
					const argGroupDescriptionText = textFromDescription(
						argGroup.options.description,
						descriptionInput,
					);
					let cell0 = `--${name}`;
					if (argGroup.options.placeholder) {
						cell0 += ` ${argGroup.options.placeholder}`;
					}
					if (!argGroup.options.required) {
						cell0 = wrapInSquareBrackets(cell0);
					}
					return [cell0, argGroupDescriptionText];
				},
			);

			lines.push(...TwoColumnTable(rows, twoColumnTableOptions));
			lines.push('');
		}
	}

	if (doubleDashArgGroup && !doubleDashArgGroup.options.hidden) {
		const { placeholder, required } = doubleDashArgGroup.options;
		const fullPlaceholder = `-- ${placeholder}`;
		firstLine += ` ${
			required ? fullPlaceholder : wrapInSquareBrackets(fullPlaceholder)
		}`;
		lines.push('"Double dash" arguments:');
		lines.push('');
		lines.push(
			...TwoColumnTable(
				[
					[
						placeholder,
						textFromDescription(
							doubleDashArgGroup.options.description,
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
