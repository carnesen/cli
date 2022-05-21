import { ICliCommandGroup } from './cli-command-group';
import { reWrapText } from './re-wrap-text';
import { usageSubcommandRowsFactory } from './usage-subcommand-rows';
import { TwoColumnTable } from './two-column-table';
import { UsageOptions } from './usage-options';
import { descriptionTextFactory } from './cli-description';

export function usageForCommandGroup(
	{
		current,
		parents,
	}: { current: ICliCommandGroup; parents: ICliCommandGroup[] },
	{ indentation, color, columns }: UsageOptions,
): string[] {
	const commandPath = [...parents, current].map(({ name }) => name).join(' ');
	const lines: string[] = [];
	lines.push(`Usage: ${commandPath ? `${commandPath} ` : ''}<subcommand> ...`);
	lines.push('');
	const description = descriptionTextFactory(current.description, {
		ansi: color,
		color,
	});
	const descriptionLines = reWrapText(description, {
		columns,
		indentation,
	});
	if (descriptionLines.length > 0) {
		lines.push(...descriptionLines);
		lines.push('');
	}

	lines.push('Subcommands:');
	lines.push('');

	const subcommandRows = usageSubcommandRowsFactory(current, {
		ansi: color,
		color,
	});

	lines.push(
		...TwoColumnTable(subcommandRows, {
			columns,
			indentation,
			maxParagraphs: 1,
		}),
	);

	return lines;
}
