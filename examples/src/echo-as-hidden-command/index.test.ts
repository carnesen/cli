import { cli, ECHO_AS_HIDDEN_COMMAND } from '.';

describe(__filename, () => {
	it(`has a hidden command "${ECHO_AS_HIDDEN_COMMAND}"`, async () => {
		expect(await cli(ECHO_AS_HIDDEN_COMMAND, 'foo')).toBe('foo');
	});
});
