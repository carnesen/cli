import { cli, HIDDEN_BRANCH } from '.';

describe(__filename, () => {
	it(`has a command "${HIDDEN_BRANCH} echo"`, async () => {
		expect(await cli(HIDDEN_BRANCH, 'echo', 'foo')).toBe('foo');
	});
});
