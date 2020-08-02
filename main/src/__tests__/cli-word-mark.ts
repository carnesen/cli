import { CliWordMark } from '../cli-word-mark';
import { CliAnsi } from '../cli-ansi';

describe(CliWordMark.name, () => {
	it('returns an ansi-bold decorated string', () => {
		const ansi = CliAnsi(true);
		expect(CliWordMark({ ansi })).toBe(ansi.bold('@carnesen/cli'));
	});
});
