"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliStringArgParser = void 0;
const cli_usage_error_1 = require("../cli-usage-error");
function CliStringArgParser(config = {}) {
    const { defaultValue, required = false, description, placeholder = '<str>', hidden = false, } = config;
    const argParser = {
        hidden,
        placeholder,
        required,
        parse(args) {
            if (!args) {
                return typeof defaultValue === 'string' ? defaultValue : undefined;
            }
            if (args.length > 1) {
                throw new cli_usage_error_1.CliUsageError(`Expected just one ${placeholder}`);
            }
            if (args.length === 0) {
                throw new cli_usage_error_1.CliUsageError(`Expected a ${placeholder}`);
            }
            return args[0];
        },
        description,
    };
    return argParser;
}
exports.CliStringArgParser = CliStringArgParser;
//# sourceMappingURL=cli-string-arg-parser.js.map