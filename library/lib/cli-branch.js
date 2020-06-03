"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliBranch = void 0;
const constants_1 = require("./constants");
/**
 * A factory function for creating command branches
 * @remarks
 * @param options
 * @returns Returns the newly-created branch object
 * @example
 * ```typescript
 * const cloudBranch = CliBranch()
 * ```
 */
function CliBranch(options) {
    return {
        ...options,
        commandType: constants_1.CLI_BRANCH,
    };
}
exports.CliBranch = CliBranch;
//# sourceMappingURL=cli-branch.js.map