import { CliAnsi } from '../cli-ansi';
import { stripAnsi } from '../strip-ansi';

const METHOD_NAMES = [
	'bold' as const,
	'red' as const,
	'green' as const,
	'blue' as const,
];

describe(CliAnsi.name, () => {
	it(`has methods ${METHOD_NAMES}`, () => {
		for (const enabled of [true, false, undefined]) {
			const ansi = CliAnsi(enabled);
			for (const methodName of METHOD_NAMES) {
				expect(typeof ansi[methodName]).toBe('function');
			}
		}
	});

	it(`returns the provided string if enabled=false`, () => {
		const ansi = CliAnsi(false);
		for (const methodName of METHOD_NAMES) {
			expect(ansi[methodName]('foo')).toBe('foo');
		}
	});

	it(`returns a wrapped string if enabled=true`, () => {
		const ansi = CliAnsi(true);
		for (const methodName of METHOD_NAMES) {
			const value = ansi[methodName]('foo');
			expect(value.includes('\u001b')).toBe(true);
			expect(stripAnsi(value)).toBe('foo');
		}
	});
});
