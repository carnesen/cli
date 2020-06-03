"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const navigate_to_command_1 = require("./navigate-to-command");
const cli_branch_1 = require("./cli-branch");
const cli_command_1 = require("./cli-command");
const command = cli_command_1.CliCommand({
    name: 'echo',
    action(foo) {
        return foo;
    },
});
const branch = cli_branch_1.CliBranch({
    name: 'cli',
    subcommands: [command],
});
describe(navigate_to_command_1.navigateToCommand.name, () => {
    it('accumulates command linked list', () => {
        const [commandStack, args] = navigate_to_command_1.navigateToCommand(branch, ['echo', 'foo']);
        expect(commandStack.current).toBe(command);
        expect(commandStack.parents[0]).toBe(branch);
        expect(args).toEqual(['foo']);
    });
});
//# sourceMappingURL=navigate-to-command.test.js.map