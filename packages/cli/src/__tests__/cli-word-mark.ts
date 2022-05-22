import { CCliWordMark } from '../c-cli-word-mark';
import { cCliColorFactory } from '../c-cli-color-factory';

describe(CCliWordMark.name, () => {
	it('returns an ansi-bold decorated string', () => {
		const color = cCliColorFactory(true);
		expect(CCliWordMark({ ansi: color, color })).toBe(
			color.bold('@carnesen/cli'),
		);
	});
});
