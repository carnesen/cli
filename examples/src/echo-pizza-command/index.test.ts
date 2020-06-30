import { Cli } from '@carnesen/cli';
import { echoPizzaCommand } from '.';

const cli = Cli(echoPizzaCommand);

describe(echoPizzaCommand.name, () => {
	it('normally just echos', async () => {
		expect(await cli('foo')).toEqual('foo');
	});

	it('has a hidden option "--pizza"', async () => {
		expect(await cli('foo', '--pizza')).toMatch('__________');
	});
});
