import {
	CCliDescription,
	renderCCliDescription,
	RenderCCliDescriptionOptions,
} from '../c-cli-description';
import { cCliColorFactory } from '../c-cli-color-factory';
import { CCliColor } from '../c-cli-color';

const data: {
	title: string;
	description: CCliDescription;
	text: string;
}[] = [
	{
		title: 'Returns an empty string when passed undefined',
		description: undefined,
		text: '',
	},
	{
		title: 'Returns the string if provided one',
		description: 'foo',
		text: 'foo',
	},
	{
		title: 'Runs the function if provided one',
		description() {
			return 'foo';
		},
		text: 'foo',
	},
	{
		title: 'Runs the function injecting the correct ansi',
		description(input) {
			return input.color.red('foo');
		},
		text: 'bar',
	},
];

const color: CCliColor = {
	...cCliColorFactory(false),
	red() {
		return 'bar';
	},
};

const options: RenderCCliDescriptionOptions = {
	color,
};

describe(renderCCliDescription.name, () => {
	for (const { title, description, text: output } of data) {
		it(title, () => {
			expect(renderCCliDescription(description, options)).toBe(output);
		});
	}
	it('throws if provided an invalid description', () => {
		expect(() => renderCCliDescription(42 as any as string, options)).toThrow(
			'Unexpected description',
		);
	});
});
