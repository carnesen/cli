/**
 * Split text into lines.
 * - Preserve blank lines as paragraph separators
 * - Split too-long lines
 * - Condense too-short lines within a paragraph
 * - Condense redundant paragraph separators
 * @param description The text
 * @param maxLineLength Target line width
 * @param indentation A prefix for every line
 * @returns An array of wrapped lines with empty-line paragraph separators
 */
export function hardWrap(
	description = '',
	maxLineLength = +Infinity,
	indentation = '',
): string[] {
	/**
	 * Trim leading and trailing whitespace to handle things like:
	 * text = `
	 * blah blah
	 * more blah
	 * `
	 * */
	const usableMaxLineLength = maxLineLength - indentation.length;
	const inputLines = description.trim().split('\n');
	let outputLine = '';
	const outputLines: string[] = [];

	for (let inputLine of inputLines) {
		/**
		 * Trim individual lines too to handle
		 * description: `blah blah
		 *               more blah`
		 */
		inputLine = inputLine.trim();
		if (inputLine.length === 0 && outputLine.length > 0) {
			// An empty input line terminates a paragraph. The `outputLine.length > 0`
			// conditional means we treat multiple empty lines as a single paragraph break.
			outputLines.push(outputLine, '');
			outputLine = '';
			continue;
		}
		const words = inputLine.split(' ');
		for (let word of words) {
			// Correct for unlikely event that a single word is longer than the max line width
			word = word.substring(0, usableMaxLineLength);

			// Handle case where current line is empty
			if (outputLine.length === 0) {
				outputLine = word;
				continue;
			}

			// Try to fit word onto current line, which is not empty
			if (outputLine.length + 1 + word.length <= usableMaxLineLength) {
				outputLine = `${outputLine} ${word}`;
				continue;
			}

			// Word does not fit on this line. Let's start a new one.
			outputLines.push(outputLine);
			outputLine = word;
		}
	}
	if (outputLine.length > 0) {
		outputLines.push(outputLine);
	}

	return outputLines.map((line) =>
		line.length > 0 && indentation.length ? `${indentation}${line}` : line,
	);
}
