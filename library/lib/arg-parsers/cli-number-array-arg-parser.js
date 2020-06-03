"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliNumberArrayArgParser = void 0;
const util_1 = require("../util");
const cli_usage_error_1 = require("../cli-usage-error");
function CliNumberArrayArgParser(config = {}) {
    const { required = false, description, placeholder = '<num0> [...]', hidden = false, } = config;
    const argParser = {
        required,
        hidden,
        parse(args) {
            if (!args) {
                return undefined;
            }
            if (args.length === 0) {
                throw new cli_usage_error_1.CliUsageError(`Expected one or more arguments ${placeholder}`);
            }
            return args.map(util_1.convertToNumber);
        },
        description,
        placeholder,
    };
    return argParser;
}
exports.CliNumberArrayArgParser = CliNumberArrayArgParser;
//# sourceMappingURL=cli-number-array-arg-parser.js.map