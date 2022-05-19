import { ICliCommandGroup } from './cli-command-group';
import { reWrapText } from './re-wrap-text';
import { UsageSubcommandRows } from './usage-subcommand-rows';
import { TwoColumnTable } from './two-column-table';
import { UsageOptions } from './usage-options';
import { DescriptionText } from './cli-description';
import { cliColorFactory } from './cli-color-factory';

export function usageForCommandGroup(
	{
		current,
		parents,
	}: { current: ICliCommandGroup; parents: ICliCommandGroup[] },
	{ indentation, color: ansi, columns }: UsageOptions,
): string[] {
	const commandPath = [...parents, current].map(({ name }) => name).join(' ');
	const lines: string[] = [];
	lines.push(`Usage: ${commandPath ? `${commandPath} ` : ''}<subcommand> ...`);
	lines.push('');
	const description = DescriptionText(current.description, { ansi });
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

	const subcommandRows = UsageSubcommandRows(current, {
		ansi: cliColorFactory(),
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
