"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const run_and_catch_1 = require("@carnesen/run-and-catch");
const cli_branch_1 = require("./cli-branch");
const cli_command_1 = require("./cli-command");
const dummy_arg_parsers_for_testing_1 = require("./dummy-arg-parsers-for-testing");
const run_cli_1 = require("./run-cli");
const find_version_1 = require("./find-version");
const cli_usage_error_1 = require("./cli-usage-error");
const commandWithNamedArgParsers = cli_command_1.CliCommand({
    name: 'command-with-named-args',
    namedArgParsers: {
        foo: dummy_arg_parsers_for_testing_1.dummyArgParser,
    },
    action(...args) {
        return args;
    },
});
const commandWithPositionalArgParser = cli_command_1.CliCommand({
    name: 'command-with-positional-args',
    positionalArgParser: dummy_arg_parsers_for_testing_1.dummyArgParser,
    action(...args) {
        return args;
    },
});
const commandWithEscapedArgParser = cli_command_1.CliCommand({
    name: 'command-with-escaped-arg-parser',
    escapedArgParser: dummy_arg_parsers_for_testing_1.dummyArgParser,
    action(...args) {
        return args;
    },
});
const root = cli_branch_1.CliBranch({
    name: 'cli',
    subcommands: [
        commandWithPositionalArgParser,
        commandWithNamedArgParsers,
        commandWithEscapedArgParser,
    ],
});
const cliArgRunner = run_cli_1.RunCli(root);
describe(run_cli_1.RunCli.name, () => {
    it('calls the enhancer if provided', async () => {
        const spy = jest.fn();
        const enhancer = (innerArgRunner) => async (...args) => {
            spy(...args);
            await innerArgRunner(...args);
        };
        const enhancedArgRunner = run_cli_1.RunCli(commandWithPositionalArgParser, {
            enhancer,
        });
        await enhancedArgRunner('foo', 'bar');
        expect(spy.mock.calls).toEqual([['foo', 'bar']]);
    });
    it('returns version string from package.json if "--version" is passed', async () => {
        const version = await find_version_1.findVersion();
        expect(await cliArgRunner('--version')).toBe(version);
    });
    it('throws USAGE error with empty message if --help is passed', async () => {
        const exception = await run_and_catch_1.runAndCatch(cliArgRunner, '--help');
        expect(exception.code).toBe(cli_usage_error_1.CLI_USAGE_ERROR);
        expect(exception.message).toBeFalsy();
    });
    it('throws USAGE error with empty message if last command is a branch and no additional args is present', async () => {
        const exception = await run_and_catch_1.runAndCatch(cliArgRunner);
        expect(exception.code).toBe(cli_usage_error_1.CLI_USAGE_ERROR);
        expect(exception.message).toBeFalsy();
    });
    it('throws USAGE error "bad command" if last command is a branch and additional args is present', async () => {
        const exception = await run_and_catch_1.runAndCatch(cliArgRunner, 'oops');
        expect(exception.code).toBe(cli_usage_error_1.CLI_USAGE_ERROR);
        expect(exception.message).toMatch(/bad command/i);
        expect(exception.message).toMatch('"oops"');
        expect(exception.message).toMatchSnapshot();
    });
    it('throws USAGE error "positional arguments" if last command is a command without positionalArgParser property and additional args is present', async () => {
        const exception = await run_and_catch_1.runAndCatch(cliArgRunner, commandWithNamedArgParsers.name, 'oops');
        expect(exception.code).toBe(cli_usage_error_1.CLI_USAGE_ERROR);
        expect(exception.message).toMatch('Unexpected argument "oops"');
        expect(exception.message).toMatch(commandWithNamedArgParsers.name);
        expect(exception.message).toMatch(/positional arguments/i);
        expect(exception.message).toMatchSnapshot();
    });
    it('Passes parsed positional value as first argument of the "action" function', async () => {
        const positionalArgs = ['foo', 'bar'];
        const result = await cliArgRunner(commandWithPositionalArgParser.name, ...positionalArgs);
        expect(result).toEqual([dummy_arg_parsers_for_testing_1.dummyArgParser.parse(positionalArgs), {}, undefined]);
    });
    it('Passes parsed named values as second argument of the "action" function', async () => {
        const namedArgs = ['--foo', 'bar'];
        const result = await cliArgRunner(commandWithNamedArgParsers.name, ...namedArgs);
        expect(result).toEqual([
            undefined,
            { foo: dummy_arg_parsers_for_testing_1.dummyArgParser.parse(['bar']) },
            undefined,
        ]);
    });
    it(`Throws USAGE error 'does not allow "--"' if command does not have an "escaped" property`, async () => {
        const exception = await run_and_catch_1.runAndCatch(cliArgRunner, commandWithPositionalArgParser.name, '--');
        expect(exception.code).toBe(cli_usage_error_1.CLI_USAGE_ERROR);
        expect(exception.message).toMatch(commandWithPositionalArgParser.name);
        expect(exception.message).toMatch('does not allow "--"');
    });
    it('Passes parsed escaped value as third argument of the "action" function', async () => {
        const result = await cliArgRunner(commandWithEscapedArgParser.name, '--');
        expect(result).toEqual([
            undefined,
            {},
            commandWithEscapedArgParser.escapedArgParser.parse([]),
        ]);
    });
});
//# sourceMappingURL=run-cli.test.js.map