import { runAndCatch } from '@carnesen/run-and-catch';
import { CliBranch } from './cli-branch';
import { CliCommand } from './cli-command';
import { dummyArgGroup } from './dummy-arg-groups-for-testing';
import { Cli } from './cli';
import { CLI_USAGE_ERROR, CliUsageError } from './cli-usage-error';

const commandWithNoArguments = CliCommand({
	name: 'command-with-no-args',
	action() {},
});

const commandWithNamedArgGroups = CliCommand({
	name: 'command-with-named-args',
	namedArgGroups: {
		foo: dummyArgGroup,
	},
	action(...args) {
		return args;
	},
});

const commandWithPositionalArgGroup = CliCommand({
	name: 'command-with-positional-args',
	positionalArgGroup: dummyArgGroup,
	action(...args) {
		return args;
	},
});

const commandWithEscapedArgGroup = CliCommand({
	name: 'command-with-escaped-arg-group',
	escapedArgGroup: dummyArgGroup,
	action(...args) {
		return args;
	},
});

const root = CliBranch({
	name: 'cli',
	children: [
		commandWithNoArguments,
		commandWithPositionalArgGroup,
		commandWithNamedArgGroups,
		commandWithEscapedArgGroup,
	],
});

const cli = Cli(root);

describe(Cli.name, () => {
	it(`throws ${CLI_USAGE_ERROR} if --help is passed among the arguments of on an otherwise valid invocation`, async () => {
		const exception = await runAndCatch(Cli(commandWithNoArguments), '--help');
		expect(exception.code).toBe(CLI_USAGE_ERROR);
		expect(exception.message).toBeFalsy();
	});

	it(`throws ${CLI_USAGE_ERROR} if --help is passed among the commands`, async () => {
		const exception = await runAndCatch(
			cli,
			'--help',
			commandWithNoArguments.name,
		);
		expect(exception.code).toBe(CLI_USAGE_ERROR);
		expect((exception as CliUsageError).node!.current).toBe(root);
		expect(exception.message).toBeFalsy();
	});

	it('throws USAGE error with empty message if last command is a branch and no additional args is present', async () => {
		const exception = await runAndCatch(cli);
		expect(exception.code).toBe(CLI_USAGE_ERROR);
		expect(exception.message).toBeFalsy();
	});

	it('throws USAGE error "bad command" if last command is a branch and additional args is present', async () => {
		const exception = await runAndCatch(cli, 'oops');
		expect(exception.code).toBe(CLI_USAGE_ERROR);
		expect(exception.message).toMatch(/bad command/i);
		expect(exception.message).toMatch('"oops"');
		expect(exception.message).toMatchSnapshot();
	});

	it('throws USAGE error "positional arguments" if last command is a command without positionalArgGroup property and additional args is present', async () => {
		const exception = await runAndCatch(
			cli,
			commandWithNamedArgGroups.name,
			'oops',
		);
		expect(exception.code).toBe(CLI_USAGE_ERROR);
		expect(exception.message).toMatch('Unexpected argument "oops"');
		expect(exception.message).toMatch(commandWithNamedArgGroups.name);
		expect(exception.message).toMatch(/positional arguments/i);
		expect(exception.message).toMatchSnapshot();
	});

	it('Passes parsed positional value as first argument of the "action" function', async () => {
		const positionalArgs = ['foo', 'bar'];
		const result = await cli(
			commandWithPositionalArgGroup.name,
			...positionalArgs,
		);
		expect(result).toEqual([
			dummyArgGroup.parse(positionalArgs),
			{},
			undefined,
		]);
	});

	it('Passes parsed named values as second argument of the "action" function', async () => {
		const namedArgs = ['--foo', 'bar'];
		const result = await cli(commandWithNamedArgGroups.name, ...namedArgs);
		expect(result).toEqual([
			undefined,
			{ foo: dummyArgGroup.parse(['bar']) },
			undefined,
		]);
	});

	it(`Throws USAGE error 'does not allow "--"' if command does not have an "escaped" property`, async () => {
		const exception = await runAndCatch(
			cli,
			commandWithPositionalArgGroup.name,
			'--',
		);
		expect(exception.code).toBe(CLI_USAGE_ERROR);
		expect(exception.message).toMatch(commandWithPositionalArgGroup.name);
		expect(exception.message).toMatch('does not allow "--"');
	});

	it('Passes parsed escaped value as third argument of the "action" function', async () => {
		const result = await cli(commandWithEscapedArgGroup.name, '--');
		expect(result).toEqual([
			undefined,
			{},
			commandWithEscapedArgGroup.escapedArgGroup!.parse([]),
		]);
	});
});
