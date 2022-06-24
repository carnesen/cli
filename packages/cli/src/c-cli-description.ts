import { CCliColor } from './c-cli-color';
import { cCliColorFactory } from './c-cli-color-factory';

/** Type of the object injected into a command's description when it's a
 * function */
export type RenderCCliDescriptionOptions = {
	color: CCliColor;
};

/** Type of a command description when it's a function */
export type CCliDescriptionFunction = (input: { color: CCliColor }) => string;

export type CCliDescription = undefined | string | CCliDescriptionFunction;

/** Generate a string text description from a description string or function */
export function renderCCliDescription(
	description: CCliDescription,
	options: RenderCCliDescriptionOptions,
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
			const color = options.color ?? cCliColorFactory();
			text = description({ color });
			break;
		}
		default: {
			throw new Error(`Unexpected description type "${typeof description}"`);
		}
	}
	return text;
}
