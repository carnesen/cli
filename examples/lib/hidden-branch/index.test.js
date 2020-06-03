"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("@carnesen/cli");
const _1 = require(".");
const runCli = cli_1.RunCli(_1.rootBranch);
describe(runCli.name, () => {
    it('has a command "secret echo"', async () => {
        expect(await runCli('secret', 'echo', 'foo')).toBe('foo');
    });
});
//# sourceMappingURL=index.test.js.map