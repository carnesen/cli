import { ICliBranch } from './cli-branch';
import { wrapInSquareBrackets } from './util';
import { AnyParser, AnyNamedParsers } from './cli-parser';
import { ICliCommand } from './cli-command';
import { hardWrap } from './hard-wrap';
import { TwoColumnTable, TwoColumnTableRow } from './two-column-table';

export function UsageForCommand(
	current: ICliCommand<AnyParser, AnyNamedParsers, AnyParser>,
	parents: ICliBranch[] = [],
	maxLineLength = +Infinity,
	indentation = '',
): string[] {
	const {
		positionalParser,
		namedParsers,
		escapedParser,
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

	if (positionalParser && !positionalParser.hidden) {
		if (positionalParser.required) {
			firstLine += ` ${positionalParser.placeholder}`;
		} else {
			firstLine += ` ${wrapInSquareBrackets(positionalParser.placeholder)}`;
		}
		lines.push('Positional arguments:');
		lines.push('');
		lines.push(
			...TwoColumnTable(
				[[positionalParser.placeholder, positionalParser.description]],
				maxLineLength,
				indentation,
			),
		);
	}

	if (namedParsers) {
		const namedParserEntries = Object.entries(namedParsers).filter(
			([_, parser]) => !parser.hidden,
		);
		if (namedParserEntries.length > 0) {
			const namedParsersNotRequired = namedParserEntries.every(
				([_, parser]) => !parser.required,
			);
			firstLine += namedParsersNotRequired ? ' [<options>]' : ' <options>';
			lines.push('Options:');
			lines.push('');
			const rows: TwoColumnTableRow[] = namedParserEntries.map(
				([name, parser]) => {
					let cell0 = `--${name}`;
					if (parser.placeholder) {
						cell0 += ` ${parser.placeholder}`;
					}
					if (!parser.required) {
						cell0 = wrapInSquareBrackets(cell0);
					}
					return [cell0, parser.description];
				},
			);

			lines.push(...TwoColumnTable(rows, maxLineLength, indentation));
		}
	}

	if (escapedParser && !escapedParser.hidden) {
		const { placeholder, required } = escapedParser;
		const fullPlaceholder = `-- ${placeholder}`;
		firstLine += ` ${
			required ? fullPlaceholder : wrapInSquareBrackets(fullPlaceholder)
		}`;
		lines.push('Special arguments:');
		lines.push('');
		lines.push(...TwoColumnTable([[placeholder, escapedParser.description]]));
	}

	return [firstLine, '', ...lines];
}
