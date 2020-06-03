"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coded_error_1 = require("@carnesen/coded-error");
const cli_command_1 = require("./cli-command");
const run_cli_and_exit_1 = require("./run-cli-and-exit");
const cli_usage_error_1 = require("./cli-usage-error");
const cli_terse_error_1 = require("./cli-terse-error");
const constants_1 = require("./constants");
async function runMocked(action) {
    const result = {
        consoleLog: jest.fn(),
        consoleError: jest.fn(),
        processExit: jest.fn(),
    };
    await run_cli_and_exit_1.runCliAndExit(cli_command_1.CliCommand({
        name: 'cli',
        action,
    }), {
        args: [],
        ...result,
    });
    expect(result.processExit.mock.calls.length).toBe(1);
    expect(result.processExit.mock.calls[0].length).toBe(1);
    const exitCode = result.processExit.mock.calls[0][0];
    expect(result.consoleError.mock.calls.length + result.consoleLog.mock.calls.length).toBeLessThanOrEqual(1);
    let errorMessage;
    let logMessage;
    if (result.consoleLog.mock.calls.length === 1) {
        expect(result.consoleLog.mock.calls.length).toBe(1);
        [[logMessage]] = result.consoleLog.mock.calls;
    }
    if (result.consoleError.mock.calls.length === 1) {
        expect(result.consoleError.mock.calls.length).toBe(1);
        [[errorMessage]] = result.consoleError.mock.calls;
    }
    return { exitCode, errorMessage, logMessage };
}
describe(run_cli_and_exit_1.runCliAndExit.name, () => {
    it('exits 0 and does not console.log if action succeeds', async () => {
        const { exitCode, errorMessage, logMessage } = await runMocked(() => {
            // do nothing
        });
        expect(exitCode).toBe(0);
        expect(errorMessage).toBe(undefined);
        expect(logMessage).toBe(undefined);
    });
    it('exits 0 and console.logs resolved value if action succeeds', async () => {
        const { exitCode, errorMessage, logMessage } = await runMocked(() => 'foo');
        expect(exitCode).toBe(0);
        expect(errorMessage).toBe(undefined);
        expect(logMessage).toBe('foo');
    });
    it('exits 1 and console.errors "non-truthy exception" if action throws a non-truthy exception', async () => {
        const { exitCode, errorMessage, logMessage } = await runMocked(() => {
            // eslint-disable-next-line no-throw-literal
            throw '';
        });
        expect(exitCode).toBe(1);
        expect(errorMessage).toMatch('non-truthy exception');
        expect(logMessage).toBe(undefined);
    });
    it('exits 1 and console.errors a usage string if action throws a UsageError', async () => {
        const { exitCode, errorMessage, logMessage } = await runMocked(() => {
            throw new cli_usage_error_1.CliUsageError();
        });
        expect(exitCode).toBe(1);
        expect(errorMessage).toMatch('Usage');
        expect(logMessage).toBe(undefined);
    });
    it('exits 1 and console.errors a red error message if action throws a TerseError', async () => {
        const { exitCode, errorMessage, logMessage } = await runMocked(() => {
            throw new cli_terse_error_1.CliTerseError('foo');
        });
        expect(exitCode).toBe(1);
        expect(errorMessage).toMatch(constants_1.RED_ERROR);
        expect(errorMessage).toMatch('foo');
        expect(logMessage).toBe(undefined);
    });
    it('exits 1 and console.errors the full error if action throws a TerseError without a message', async () => {
        const { exitCode, errorMessage, logMessage } = await runMocked(() => {
            throw new cli_terse_error_1.CliTerseError('');
        });
        expect(exitCode).toBe(1);
        expect(typeof errorMessage).toBe('object');
        expect(errorMessage.code).toBe(cli_terse_error_1.CLI_TERSE_ERROR);
        expect(logMessage).toBe(undefined);
    });
    it('exits with the specified code if the code is a number', async () => {
        const { exitCode, errorMessage, logMessage } = await runMocked(() => {
            throw new coded_error_1.CodedError('', 123);
        });
        expect(exitCode).toBe(123);
        expect(errorMessage).toBe(undefined);
        expect(logMessage).toBe(undefined);
    });
    it('exits with the specified code if the code is a number and console.errors the message if there is one', async () => {
        const { exitCode, errorMessage, logMessage } = await runMocked(() => {
            throw new coded_error_1.CodedError('foo', 123);
        });
        expect(exitCode).toBe(123);
        expect(errorMessage).toBe('foo');
        expect(logMessage).toBe(undefined);
    });
    it('console.errors any other error thrown and exits 1', async () => {
        const error = new Error();
        const { exitCode, errorMessage, logMessage } = await runMocked(() => {
            throw error;
        });
        expect(exitCode).toBe(1);
        expect(errorMessage).toBe(error);
        expect(logMessage).toBe(undefined);
    });
    it('uses sensible defaults for all options', async () => {
        run_cli_and_exit_1.runCliAndExit(cli_command_1.CliCommand({
            name: 'cli',
            action() {
                // do nothing
            },
        }), { processExit: jest.fn(), args: [] });
    });
});
//# sourceMappingURL=run-cli-and-exit.test.js.map