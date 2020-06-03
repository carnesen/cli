"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.examples = void 0;
const cli_1 = require("@carnesen/cli");
const echo_1 = require("./echo");
const multiply_1 = require("./multiply");
const throw_special_error_1 = require("./throw-special-error");
exports.examples = cli_1.CliBranch({
    name: 'examples',
    description: `Examples that demonstrate @carnesen/cli features`,
    subcommands: [echo_1.echo, multiply_1.multiply, throw_special_error_1.throwSpecialError],
});
if (module === require.main) {
    cli_1.runCliAndExit(exports.examples);
}
//# sourceMappingURL=index.js.map