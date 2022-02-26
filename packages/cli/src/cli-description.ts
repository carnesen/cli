import { ICliAnsi } from './cli-ansi';

export interface ICliDescriptionFunctionInput {
	ansi: ICliAnsi;
}

export type TCliDescriptionFunction = (
	input: ICliDescriptionFunctionInput,
) => string;

export type TCliDescription = undefined | string | TCliDescriptionFunction;

export function DescriptionText(
	description: TCliDescription,
	input: ICliDescriptionFunctionInput,
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
