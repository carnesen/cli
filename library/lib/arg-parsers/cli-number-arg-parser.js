"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliNumberArgParser = void 0;
const util_1 = require("../util");
const cli_usage_error_1 = require("../cli-usage-error");
function CliNumberArgParser(config = {}) {
    const { required = false, description, defaultValue, placeholder = '<num>', hidden = false, } = config;
    const argParser = {
        required,
        hidden,
        parse(args) {
            if (!args) {
                return typeof defaultValue === 'number' ? defaultValue : undefined;
            }
            if (args.length > 1) {
                throw new cli_usage_error_1.CliUsageError(`Expected just one ${placeholder}`);
            }
            if (args.length === 0) {
                throw new cli_usage_error_1.CliUsageError(`Expected a ${placeholder}`);
            }
            return util_1.convertToNumber(args[0]);
        },
        description,
        placeholder,
    };
    return argParser;
}
exports.CliNumberArgParser = CliNumberArgParser;
//# sourceMappingURL=cli-number-arg-parser.js.map