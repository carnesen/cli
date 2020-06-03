"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliCommand = void 0;
const constants_1 = require("./constants");
/**
 *
 * A factory function for creating CLI command commands
 * @param options
 * @returns The newly-created `command`.
 */
function CliCommand(options) {
    return {
        ...options,
        commandType: constants_1.CLI_COMMAND,
    };
}
exports.CliCommand = CliCommand;
//# sourceMappingURL=cli-command.js.map