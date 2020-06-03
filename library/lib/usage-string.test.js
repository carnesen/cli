"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usage_string_1 = require("./usage-string");
const cli_branch_1 = require("./cli-branch");
const cli_string_arg_parser_1 = require("./arg-parsers/cli-string-arg-parser");
const cli_command_1 = require("./cli-command");
const messageArgParser = cli_string_arg_parser_1.CliStringArgParser({ description: 'A string message please' });
const positionalArgParser = cli_string_arg_parser_1.CliStringArgParser({
    description: 'A word',
    placeholder: '<word>',
});
const escapedArgParser = cli_string_arg_parser_1.CliStringArgParser({
    description: 'Another word',
    required: true,
});
const command = cli_command_1.CliCommand({
    name: 'echo',
    positionalArgParser,
    namedArgParsers: {
        message: messageArgParser,
    },
    escapedArgParser,
    action(foo) {
        return foo;
    },
});
const branch = cli_branch_1.CliBranch({
    name: 'cli',
    description: 'This is a CLI',
    subcommands: [command],
});
describe(usage_string_1.UsageString.name, () => {
    it('Creates a usage string for a branch', () => {
        const usageString = usage_string_1.UsageString({ current: branch, parents: [] });
        expect(usageString).toMatchSnapshot();
    });
    it('Creates a usage string for a command without a parent', () => {
        const usageString = usage_string_1.UsageString({ current: command, parents: [] });
        expect(usageString).toMatch(messageArgParser.description);
        expect(usageString).toMatchSnapshot();
    });
    it('Creates a usage string for a command without a parent branch', () => {
        const usageString = usage_string_1.UsageString({
            current: command,
            parents: [branch],
        });
        expect(usageString).toMatchSnapshot();
    });
    it('Does not write usage for named argParsers if there are none', () => {
        const fooCommand = cli_command_1.CliCommand({ name: 'foo', action() { } });
        const usageString = usage_string_1.UsageString({ current: fooCommand, parents: [] });
        expect(usageString).toMatchSnapshot();
    });
});
//# sourceMappingURL=usage-string.test.js.map