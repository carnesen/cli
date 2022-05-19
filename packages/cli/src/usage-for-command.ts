import { wrapInSquareBrackets } from './util';
import { reWrapText } from './re-wrap-text';
import { TwoColumnTable, TTwoColumnTableRow } from './two-column-table';
import {
	DescriptionText,
	CliDescriptionFunctionInput,
} from './cli-description';
import { CliLeaf } from './cli-tree';
import { UsageOptions } from './usage-options';

export function usageForCommand(
	leaf: CliLeaf,
	options: UsageOptions,
): string[] {
	const { current, parents } = leaf;
	const { columns, indentation, color: ansi } = options;
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

	const descriptionInput: CliDescriptionFunctionInput = { ansi };
	const commandDescriptionText: string = DescriptionText(
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
		if (positionalArgGroup.required) {
			firstLine += ` ${positionalArgGroup.placeholder}`;
		} else {
			firstLine += ` ${wrapInSquareBrackets(positionalArgGroup.placeholder)}`;
		}
		const positionalArgGroupDescriptionText = DescriptionText(
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
			const namedArgGroupsNotRequired = namedArgGroupEntries.every(
				([_, argGroup]) => !argGroup.required,
			);
			firstLine += namedArgGroupsNotRequired
				? ' [<named args>]'
				: ' <named args>';
			lines.push('Named arguments:');
			lines.push('');
			const rows: TTwoColumnTableRow[] = namedArgGroupEntries.map(
				([name, argGroup]) => {
					const argGroupDescriptionText = DescriptionText(
						argGroup.description,
						descriptionInput,
					);
					let cell0 = `--${name}`;
					if (argGroup.placeholder) {
						cell0 += ` ${argGroup.placeholder}`;
					}
					if (!argGroup.required) {
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
		const { placeholder, required } = doubleDashArgGroup;
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
						DescriptionText(doubleDashArgGroup.description, descriptionInput),
					],
				],
				twoColumnTableOptions,
			),
		);
	}

	return [firstLine, '', ...lines];
}
