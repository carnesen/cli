import { CliWordMark } from '../cli-word-mark';
import { cliColorFactory } from '../cli-color-factory';

describe(CliWordMark.name, () => {
	it('returns an ansi-bold decorated string', () => {
		const color = cliColorFactory(true);
		expect(CliWordMark({ ansi: color, color })).toBe(
			color.bold('@carnesen/cli'),
		);
	});
});
