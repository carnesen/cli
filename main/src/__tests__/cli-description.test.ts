import {
	DescriptionText,
	TCliDescription,
	ICliDescriptionFunctionInput,
} from '../cli-description';
import { CliAnsi } from '../cli-ansi';

const data: {
	title: string;
	description: TCliDescription;
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
		description({ ansi }) {
			return ansi.red('foo');
		},
		text: 'bar',
	},
];

const input: ICliDescriptionFunctionInput = {
	ansi: {
		...CliAnsi(false),
		red() {
			return 'bar';
		},
	},
};

describe(DescriptionText.name, () => {
	for (const { title, description, text: output } of data) {
		it(title, () => {
			expect(DescriptionText(description, input)).toBe(output);
		});
	}
	it('throws if provided an invalid description', () => {
		expect(() => DescriptionText((42 as any) as string, input)).toThrow(
			'Unexpected description',
		);
	});
});
