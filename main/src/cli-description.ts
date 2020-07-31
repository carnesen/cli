import { ICliAnsi } from './cli-ansi';

export interface IDescriptionInput {
	ansi: ICliAnsi;
}

export type TCliDescription =
	| undefined
	| string
	| ((input: IDescriptionInput) => string);

export function DescriptionText(
	description: TCliDescription,
	input: IDescriptionInput,
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
