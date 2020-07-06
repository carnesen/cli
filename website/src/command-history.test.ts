import { CommandHistory } from './command-history';

const data: {
	operate: (subject: CommandHistory) => void;
	expectedList?: string[];
}[] = [
	{
		operate(subject) {
			subject.submit('foo');
		},
		expectedList: ['foo'],
	},
	{
		operate(subject) {
			subject.submit('foo');
			subject.submit('foo');
		},
		expectedList: ['foo'],
	},
	{
		operate(subject) {
			subject.submit('foo');
			subject.submit('bar');
		},
		expectedList: ['foo', 'bar'],
	},
	{
		operate(subject) {
			subject.submit('foo');
			subject.submit('bar');
			subject.submit('foo');
		},
		expectedList: ['bar', 'foo'],
	},
	{
		operate(subject) {
			subject.submit('foo');
			subject.submit('bar');
			subject.previous('baz');
			subject.previous();
			subject.next();
			expect(subject.current()).toBe('bar');
		},
		expectedList: ['foo', 'bar', 'baz'],
	},
];

describe(CommandHistory.name, () => {
	it('Initializes with no lines if none are provided', () => {
		const subject = new CommandHistory();
		expect(subject.list()).toEqual([]);
	});

	it('Initializes with the provided lines', () => {
		const lines = ['foo'];
		const subject = new CommandHistory(lines);
		expect(subject.list()).toEqual(lines);
	});

	data.forEach(({ operate, expectedList }, index) => {
		it(`${CommandHistory.name} programmatic test number ${index}`, () => {
			const subject = new CommandHistory();
			operate(subject);
			if (expectedList) {
				expect(subject.list()).toEqual(expectedList);
			}
		});
	});
});
