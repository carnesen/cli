import {
	descriptionTextFactory,
	AnyCliDescription,
	CCliDescriptionFunctionInput,
} from '../c-cli-description';
import { cCliColorFactory } from '../c-cli-color-factory';
import { CCliColor } from '../c-cli-color';

const data: {
	title: string;
	description: AnyCliDescription;
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
		description({ color: ansi }) {
			return ansi.red('foo');
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

const input: CCliDescriptionFunctionInput = {
	ansi: color,
	color,
};

describe(descriptionTextFactory.name, () => {
	for (const { title, description, text: output } of data) {
		it(title, () => {
			expect(descriptionTextFactory(description, input)).toBe(output);
		});
	}
	it('throws if provided an invalid description', () => {
		expect(() => descriptionTextFactory(42 as any as string, input)).toThrow(
			'Unexpected description',
		);
	});
});
