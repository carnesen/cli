"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPathAndDescriptionOfLeaves = void 0;
const constants_1 = require("./constants");
function getPathAndDescriptionOfLeaves(command, path) {
    if (command.hidden && path.length > 0) {
        // ^^ conditional on path.length > 0 because we don't want to hide the usage
        // for the current node, e.g. if a user does `cli hidden-command` it should
        // show the leaves underneath "hidden-command".
        return [];
    }
    if (command.commandType === constants_1.CLI_COMMAND) {
        return [
            {
                path,
                description: command.description,
            },
        ];
    }
    const returnValue = [];
    for (const subcommand of command.subcommands) {
        returnValue.push(...getPathAndDescriptionOfLeaves(subcommand, [...path, subcommand.name]));
    }
    return returnValue;
}
exports.getPathAndDescriptionOfLeaves = getPathAndDescriptionOfLeaves;
//# sourceMappingURL=get-path-and-description-of-commands.js.map