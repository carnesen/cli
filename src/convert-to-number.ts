import { CCliUsageError } from './c-cli-usage-error';

/** Optional constraints on a parsed number */
export type CCliNumberConstraints = {
	/** If `true`, only integers are allowed */
	integer?: boolean;

	/** Smallest allowed value (inclusive) */
	min?: number;

	/** Largest allowed value (inclusive) */
	max?: number;
};

export function convertToNumber(
	rawValue: string,
	constraints: CCliNumberConstraints = {},
): number {
	let value = NaN;
	if (rawValue.length > 0) {
		value = Number(rawValue);
	}
	if (Number.isNaN(value)) {
		throw new CCliUsageError(`"${rawValue}" is not a number`);
	}
	const { integer, min, max } = constraints;
	if (integer && !Number.isInteger(value)) {
		throw new CCliUsageError(`"${rawValue}" is not an integer`);
	}
	if (min !== undefined && value < min) {
		throw new CCliUsageError(`"${rawValue}" is less than the minimum ${min}`);
	}
	if (max !== undefined && value > max) {
		throw new CCliUsageError(
			`"${rawValue}" is greater than the maximum ${max}`,
		);
	}
	return value;
}
