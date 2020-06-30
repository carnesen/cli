export interface IHardWrapTextOptions {
	/** A prefix for every line */
	indentation?: string;
	/** Target line width */
	maxLineLength?: number;
	/** Paragraphs after this many will be dropped */
	maxParagraphs?: number;
}
/**
 * Split text into lines.
 * - Preserve blank lines as paragraph separators
 * - Split too-long lines
 * - Condense too-short lines within a paragraph
 * - Condense redundant paragraph separators
 * @param text The text
 * @param options An [[`IHardWrapTextOptions`]] object
 * @returns An array of wrapped lines with empty-line paragraph separators
 */
export function hardWrapText(
	text = '',
	options: IHardWrapTextOptions = {},
): string[] {
	if (!text) {
		return [];
	}
	const {
		maxLineLength = +Infinity,
		indentation = '',
		maxParagraphs,
	} = options;
	// Trim leading and trailing whitespace to handle things like:
	// text = `
	// blah blah
	// more blah
	// `
	const usableMaxLineLength = maxLineLength - indentation.length;
	const trimmedText = text.trim();
	if (!trimmedText) {
		return [];
	}
	// At this point we are sure there is at least one non-empty input line

	const inputLines = trimmedText.split('\n');

	// The line currently being built
	let currentLine = '';
	const outputLines: string[] = [];
	let paragraphIndex = 0;
	let previousLineWasEmpty = false;

	for (let inputLine of inputLines) {
		// Trim individual lines too to handle properties defined like:
		// text: `blah blah
		//        more blah`
		inputLine = inputLine.trim();

		// An empty input line terminates a paragraph.
		if (inputLine.length === 0) {
			// Treat multiple empty lines as a single paragraph break
			if (previousLineWasEmpty) {
				continue;
			}
			previousLineWasEmpty = true;

			// It should be the case that outputLines has content because of the other
			// trims and conditionals in place.
			if (currentLine.length === 0) {
				throw new Error('Expected output line to have length >=0');
			}

			if (maxParagraphs && paragraphIndex === maxParagraphs - 1) {
				break;
				// The currentLine will still get written at the end if it has content
			}
			// In this state we know there is more text to come because we never end
			// on an empty line due to trimming. So let's push the current line and a
			// empty line and make sure via `previousLineWasEmpty` that we don't push another
			// empty output line even if there is another empty input line.
			outputLines.push(currentLine, '');
			currentLine = '';
			paragraphIndex += 1;
		} else {
			previousLineWasEmpty = false;
			const words = inputLine.split(' ');
			for (let word of words) {
				// Correct for unlikely event that a single word is longer than the max
				// line width
				word = word.substring(0, usableMaxLineLength);

				// Handle case where current line is empty
				if (currentLine.length === 0) {
					currentLine = word;
					continue;
				}

				// Try to fit word onto current line, which is not empty
				if (currentLine.length + 1 + word.length <= usableMaxLineLength) {
					currentLine = `${currentLine} ${word}`;
					continue;
				}

				// Word does not fit on this line. Let's start a new one.
				outputLines.push(currentLine);
				currentLine = word;
			}
		}
	}

	if (currentLine.length > 0) {
		outputLines.push(currentLine);
	}

	return outputLines.map((line) =>
		line.length > 0 && indentation.length ? `${indentation}${line}` : line,
	);
}
