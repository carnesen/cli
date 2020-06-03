"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cli_terse_error_1 = require("./cli-terse-error");
describe(cli_terse_error_1.CliTerseError.name, () => {
    it('Constructs an error object with property "code" set to "TERSE" with provided message', () => {
        const message = 'this is a message';
        const error = new cli_terse_error_1.CliTerseError(message);
        expect(error.code).toBe(cli_terse_error_1.CLI_TERSE_ERROR);
        expect(error.message).toBe(message);
    });
});
//# sourceMappingURL=cli-terse-error.test.js.map