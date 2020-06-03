"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_usage_error_1 = require("./cli-usage-error");
describe(cli_usage_error_1.CliUsageError.name, () => {
    it('Constructs an error object with property "code" set to "USAGE"', () => {
        const error = new cli_usage_error_1.CliUsageError();
        expect(error.code).toBe(cli_usage_error_1.CLI_USAGE_ERROR);
        expect(error.message).toBe('');
    });
    it('Constructs an error object with property "code" set to "USAGE" with provided message', () => {
        const message = 'this is a message';
        const error = new cli_usage_error_1.CliUsageError(message);
        expect(error.code).toBe(cli_usage_error_1.CLI_USAGE_ERROR);
        expect(error.message).toBe(message);
    });
});
//# sourceMappingURL=cli-usage-error.test.js.map