/** src/multiply.ts */
import { c } from '@carnesen/cli';

/** A command for multiplying large integers as JavaScript {@link BigInt}s */
export const multiplyIntegersCommand = c.command({
	name: 'multiply-integers',
	description: 'Multiply integers and print the result',
	positionalArgGroup: c.bigintArray(),
	action({ positionalValue: bigints }) {
		return bigints.reduce((a, b) => a * b, 1n);
	},
});
