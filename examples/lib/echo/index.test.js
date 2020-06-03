"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("@carnesen/cli");
const _1 = require(".");
describe(_1.echo.name, () => {
    it('" "-joins and returns the provided positional args', async () => {
        expect(await cli_1.RunCli(_1.echo)('foo', 'bar', 'baz')).toBe('foo bar baz');
    });
});
//# sourceMappingURL=index.test.js.map