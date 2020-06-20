import { ICliBranch } from './cli-branch';
import { wrapInSquareBrackets } from './util';
import { ICliCommand } from './cli-command';
import { hardWrap } from './hard-wrap';
import { TwoColumnTable, TwoColumnTableRow } from './two-column-table';

export function UsageForCommand(
	current: ICliCommand,
	parents: ICliBranch[] = [],
	maxLineLength = +Infinity,
	indentation = '',
): string[] {
	const {
		positionalArgGroup,
		namedArgGroups,
		escapedArgGroup,
		description,
	} = current;
	const commandPathString = [...parents, current]
		.map(({ name }) => name)
		.join(' ');
	let firstLine = `Usage: ${commandPathString}`;
	const lines: string[] = [];

	const descriptionLines = hardWrap(description, maxLineLength, indentation);
	if (descriptionLines.length > 0) {
		lines.push(...descriptionLines);
		lines.push('');
	}

	if (positionalArgGroup && !positionalArgGroup.hidden) {
		if (positionalArgGroup.required) {
			firstLine += ` ${positionalArgGroup.placeholder}`;
		} else {
			firstLine += ` ${wrapInSquareBrackets(positionalArgGroup.placeholder)}`;
		}
		lines.push('Positional arguments:');
		lines.push('');
		lines.push(
			...TwoColumnTable(
				[[positionalArgGroup.placeholder, positionalArgGroup.description]],
				maxLineLength,
				indentation,
			),
		);
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
			const rows: TwoColumnTableRow[] = namedArgGroupEntries.map(
				([name, argGroup]) => {
					let cell0 = `--${name}`;
					if (argGroup.placeholder) {
						cell0 += ` ${argGroup.placeholder}`;
					}
					if (!argGroup.required) {
						cell0 = wrapInSquareBrackets(cell0);
					}
					return [cell0, argGroup.description];
				},
			);

			lines.push(...TwoColumnTable(rows, maxLineLength, indentation));
		}
	}

	if (escapedArgGroup && !escapedArgGroup.hidden) {
		const { placeholder, required } = escapedArgGroup;
		const fullPlaceholder = `-- ${placeholder}`;
		firstLine += ` ${
			required ? fullPlaceholder : wrapInSquareBrackets(fullPlaceholder)
		}`;
		lines.push('Special arguments:');
		lines.push('');
		lines.push(...TwoColumnTable([[placeholder, escapedArgGroup.description]]));
	}

	return [firstLine, '', ...lines];
}
