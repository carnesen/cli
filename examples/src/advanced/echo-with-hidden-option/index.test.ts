import { cli, echoWithHiddenOption } from '.';

describe(echoWithHiddenOption.name, () => {
	it('normally just echos', async () => {
		expect(await cli('foo')).toEqual('foo');
	});
	it('has a hidden option "--pizza"', async () => {
		expect(await cli('foo', '--pizza')).toMatch('__________');
	});
});
