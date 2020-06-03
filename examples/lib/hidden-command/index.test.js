"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("@carnesen/cli");
const _1 = require(".");
const cli = cli_1.RunCli(_1.root);
describe(_1.root.name, () => {
    it('has a hidden command "hidden-echo"', async () => {
        expect(await cli('hidden-echo', 'foo')).toBe('foo');
    });
});
//# sourceMappingURL=index.test.js.map