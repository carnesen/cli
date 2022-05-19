import { CliWordMark } from '../cli-word-mark';
import { cliColorFactory } from '../cli-color-factory';

describe(CliWordMark.name, () => {
	it('returns an ansi-bold decorated string', () => {
		const ansi = cliColorFactory(true);
		expect(CliWordMark({ ansi })).toBe(ansi.bold('@carnesen/cli'));
	});
});
