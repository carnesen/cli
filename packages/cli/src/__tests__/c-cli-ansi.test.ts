import { cCliColorFactory } from '../c-cli-color-factory';
import { stripAnsi } from '../strip-ansi';

const METHOD_NAMES = [
	'bold' as const,
	'red' as const,
	'green' as const,
	'blue' as const,
];

describe(cCliColorFactory.name, () => {
	it(`has methods ${METHOD_NAMES}`, () => {
		for (const enabled of [true, false, undefined]) {
			const ansi = cCliColorFactory(enabled);
			for (const methodName of METHOD_NAMES) {
				expect(typeof ansi[methodName]).toBe('function');
			}
		}
	});

	it(`returns the provided string if enabled=false`, () => {
		const ansi = cCliColorFactory(false);
		for (const methodName of METHOD_NAMES) {
			expect(ansi[methodName]('foo')).toBe('foo');
		}
	});

	it(`returns a wrapped string if enabled=true`, () => {
		const ansi = cCliColorFactory(true);
		for (const methodName of METHOD_NAMES) {
			const value = ansi[methodName]('foo');
			expect(value.includes('\u001b')).toBe(true);
			expect(stripAnsi(value)).toBe('foo');
		}
	});
});
