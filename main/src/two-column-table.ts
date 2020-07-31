import { reWrapText } from './re-wrap-text';

/** [cell0, description] */
export type TTwoColumnTableRow = [string, string | undefined];

const SEPARATOR = ' : ';

export interface ITwoColumnTableOptions {
	indentation?: string;
	columns?: number;
	maxParagraphs?: number;
}
/**
 * Generate the lines for a two-column table
 * @param rows
 * @param options An [[`ITwoColumnTableOptions`]] object
 */
export function TwoColumnTable(
	rows: TTwoColumnTableRow[],
	options: ITwoColumnTableOptions = {},
): string[] {
	const { columns = +Infinity, indentation = '', maxParagraphs } = options;

	if (rows.length === 0) {
		return [];
	}
	const column0Width = Math.max(...rows.map((row) => row[0].length));
	const column1Width =
		columns - column0Width - SEPARATOR.length - indentation.length;
	const indentationToColumn1 = ' '.repeat(
		indentation.length + column0Width + SEPARATOR.length,
	);
	const outputLines: string[] = [];
	for (const [cell0, description] of rows) {
		const [firstDescriptionLine, ...restDescriptionLines] = reWrapText(
			description,
			{
				columns: column1Width,
				maxParagraphs,
			},
		);
		let firstOutputLine: string;
		if (firstDescriptionLine) {
			// E.g. "   --foo    : A fine argument to pass"
			firstOutputLine = `${indentation}${cell0.padEnd(
				column0Width,
			)}${SEPARATOR}${firstDescriptionLine}`;
		} else {
			// E.g. "   --foo"
			firstOutputLine = `${indentation}${cell0}`;
		}

		outputLines.push(
			firstOutputLine,
			...restDescriptionLines.map((line) => `${indentationToColumn1}${line}`),
		);
	}

	return outputLines;
}
