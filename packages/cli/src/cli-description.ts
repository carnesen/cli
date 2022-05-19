import { CliColor } from './cli-color';

export interface CliDescriptionFunctionInput {
	ansi: CliColor;
}

export type CliDescriptionFunction = (
	input: CliDescriptionFunctionInput,
) => string;

export type AnyCliDescription = undefined | string | CliDescriptionFunction;

export function DescriptionText(
	description: AnyCliDescription,
	input: CliDescriptionFunctionInput,
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
