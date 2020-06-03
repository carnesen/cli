"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("@carnesen/cli");
const hidden_option_1 = require("./hidden-option");
const runCli = cli_1.RunCli(hidden_option_1.rootCommand);
describe(hidden_option_1.rootCommand.name, () => {
    it('normally just echos', async () => {
        expect(await runCli('foo')).toEqual('foo');
    });
    it('has a hidden option "--pizza"', async () => {
        expect(await runCli('foo', '--pizza')).toMatch('__________');
    });
});
//# sourceMappingURL=hidden-option.test.js.map