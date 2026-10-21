import { runAndCatchSync } from '@carnesen/run-and-catch';
import { CCliUsageError } from '../c-cli-usage-error';
import { convertToNumber } from '../convert-to-number';

describe(convertToNumber.name, () => {
	it('converts the provided string to a number', () => {
		expect(convertToNumber('1')).toBe(1);
	});

	it('throws a usage error if a non-numeric string value is passed', () => {
		const exception = runAndCatchSync(convertToNumber, 'foo');
		expect(exception).toBeInstanceOf(CCliUsageError);
		expect(exception.message).toMatch('not a number');
	});

	it('throws a usage error if an empty string is passed', () => {
		const exception = runAndCatchSync(convertToNumber, '');
		expect(exception).toBeInstanceOf(CCliUsageError);
		expect(exception.message).toMatch('not a number');
	});

	it('throws a usage error if `integer` is set and the value is not an integer', () => {
		const exception = runAndCatchSync(convertToNumber, '1.5', {
			integer: true,
		});
		expect(exception).toBeInstanceOf(CCliUsageError);
		expect(exception.message).toBe('"1.5" is not an integer');
	});

	it('throws a usage error if the value is outside of `min` and `max`', () => {
		const constraints = { min: 1, max: 3 };
		expect(convertToNumber('1', constraints)).toBe(1);
		expect(convertToNumber('3', constraints)).toBe(3);
		const tooSmall = runAndCatchSync(convertToNumber, '0', constraints);
		expect(tooSmall).toBeInstanceOf(CCliUsageError);
		expect(tooSmall.message).toBe('"0" is less than the minimum 1');
		const tooBig = runAndCatchSync(convertToNumber, '4', constraints);
		expect(tooBig).toBeInstanceOf(CCliUsageError);
		expect(tooBig.message).toBe('"4" is greater than the maximum 3');
	});
});
