"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const run_and_catch_1 = require("@carnesen/run-and-catch");
const cli_1 = require("@carnesen/cli");
const _1 = require(".");
const cli = cli_1.RunCli(_1.throwSpecialError);
describe('throw CLI', () => {
    it('throws', async () => {
        const ex = await run_and_catch_1.runAndCatch(cli, '--message', 'foo');
        expect(ex.message).toBe('foo');
    });
});
//# sourceMappingURL=index.test.js.map