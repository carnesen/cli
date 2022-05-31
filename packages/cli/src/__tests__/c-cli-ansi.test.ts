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
			const color = cCliColorFactory(enabled);
			for (const methodName of METHOD_NAMES) {
				expect(typeof color[methodName]).toBe('function');
			}
		}
	});

	it(`returns the provided string if enabled=false`, () => {
		const color = cCliColorFactory(false);
		for (const methodName of METHOD_NAMES) {
			expect(color[methodName]('foo')).toBe('foo');
		}
	});

	it(`returns a wrapped string if enabled=true`, () => {
		const color = cCliColorFactory(true);
		for (const methodName of METHOD_NAMES) {
			const value = color[methodName]('foo');
			expect(value.includes('\u001b')).toBe(true);
			expect(stripAnsi(value)).toBe('foo');
		}
	});
});
