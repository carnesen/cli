import { c } from '@carnesen/cli';
import { echoPizzaCommand } from '../echo-pizza-command';

const cli = c.cli(echoPizzaCommand);

describe(echoPizzaCommand.name, () => {
	it('normally just echos', async () => {
		expect(await cli.api(['foo'])).toEqual('foo');
	});

	it('has a hidden option "--pizza"', async () => {
		expect(await cli.api(['foo', '--pizza'])).toMatch('__________');
	});
});
