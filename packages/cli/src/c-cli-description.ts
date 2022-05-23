import { CCliColor } from './c-cli-color';

/** Type of the object injected into a command's description when it's a
 * function */
export type CCliDescriptionFunctionInput = {
	/** @deprecated Use `color` instead */
	ansi: CCliColor;
	color: CCliColor;
};

/** Type of a command description when it's a function */
export type CCliDescriptionFunction = (
	input: CCliDescriptionFunctionInput,
) => string;

export type CCliAnyDescription = undefined | string | CCliDescriptionFunction;

/** Generate a string text description from a description string or function */
export function textFromDescription(
	description: CCliAnyDescription,
	input: CCliDescriptionFunctionInput,
): string {
	let text = '';
	switch (typeof description) {
		case 'undefined': {
			text = '';
			break;
		}
		case 'string': {
			text = description;
			break;
		}
		case 'function': {
			text = description(input);
			break;
		}
		default: {
			throw new Error(`Unexpected description type "${typeof description}"`);
		}
	}
	return text;
}
