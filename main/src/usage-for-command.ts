import { wrapInSquareBrackets } from './util';
import { reWrapText } from './re-wrap-text';
import { TwoColumnTable, TTwoColumnTableRow } from './two-column-table';
import { CliAnsi } from './cli-ansi';
import { DescriptionText, IDescriptionInput } from './cli-description';
import { ICliLeaf } from './cli-tree';
import { IUsageOptions } from './usage-options';

export function UsageForCommand(
	leaf: ICliLeaf,
	options: IUsageOptions,
): string[] {
	const { current, parents } = leaf;
	const { columns = +Infinity, indentation = '', ansi = CliAnsi() } = options;
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

	const descriptionInput: IDescriptionInput = { ansi };
	const commandDescriptionText: string = DescriptionText(
		description,
		descriptionInput,
	);

	const commandDescriptionLines = reWrapText(commandDescriptionText, {
		columns,
		indentation,
	});

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
				{
					columns,
					indentation,
				},
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
			firstLine += namedArgGroupsNotRequired ? ' [<options>]' : ' <options>';
			lines.push('Options:');
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

			lines.push(...TwoColumnTable(rows, { columns, indentation }));
		}
	}

	if (doubleDashArgGroup && !doubleDashArgGroup.hidden) {
		const { placeholder, required } = doubleDashArgGroup;
		const fullPlaceholder = `-- ${placeholder}`;
		firstLine += ` ${
			required ? fullPlaceholder : wrapInSquareBrackets(fullPlaceholder)
		}`;
		lines.push('Special arguments:');
		lines.push('');
		lines.push(
			...TwoColumnTable([
				[
					placeholder,
					DescriptionText(doubleDashArgGroup.description, descriptionInput),
				],
			]),
		);
	}

	return [firstLine, '', ...lines];
}
