"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const run_and_catch_1 = require("@carnesen/run-and-catch");
const cli_1 = require("@carnesen/cli");
const _1 = require(".");
const cliArgRunner = cli_1.RunCli(_1.exec);
describe(_1.exec.name, () => {
    it('runs the provided command', async () => {
        const output = await cliArgRunner('--', 'echo', '--foo', '--bar');
        expect(output).toBe('--foo --bar\n');
    });
    it('throws usage', async () => {
        const output = await run_and_catch_1.runAndCatch(cliArgRunner);
        expect(output.code).toBe(cli_1.CLI_USAGE_ERROR);
    });
});
//# sourceMappingURL=index.test.js.map