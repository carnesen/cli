"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_1 = require("@carnesen/cli");
const _1 = require(".");
const cli = cli_1.RunCli(_1.multiply);
describe('readme example', () => {
    it('multiplies the provided numbers together', async () => {
        expect(await cli('1', '2', '3')).toBe(6);
    });
});
//# sourceMappingURL=index.test.js.map