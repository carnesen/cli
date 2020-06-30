import { ICliBranch } from './cli-branch';
import { hardWrapText } from './hard-wrap-text';
import { UsageSubcommandRows } from './usage-subcommand-rows';
import { TwoColumnTable } from './two-column-table';

export function UsageForBranch(
	current: ICliBranch,
	parents: ICliBranch[] = [],
	maxLineLength = +Infinity,
	indentation = '',
): string[] {
	const commandPath = [...parents, current].map(({ name }) => name).join(' ');
	const lines: string[] = [];
	lines.push(`Usage: ${commandPath} <subcommand> ...`);
	lines.push('');

	const descriptionLines = hardWrapText(current.description, {
		maxLineLength,
		indentation,
	});
	if (descriptionLines.length > 0) {
		lines.push(...descriptionLines);
		lines.push('');
	}

	lines.push('Subcommands:');
	lines.push('');

	const subcommandRows = UsageSubcommandRows(current);

	lines.push(
		...TwoColumnTable(subcommandRows, {
			maxLineLength,
			indentation,
			maxParagraphs: 1,
		}),
	);

	return lines;
}
