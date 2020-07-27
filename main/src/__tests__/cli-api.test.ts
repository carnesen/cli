import { runAndCatch } from '@carnesen/run-and-catch';
import { CliBranch } from '../cli-branch';
import { CliCommand } from '../cli-command';
import {
	dummyArgGroup,
	DUMMY_ARG_GROUP_UNDEFINED_WAS_PASSED,
} from '../dummy-arg-groups';
import { CliApi } from '../cli-api';
import { CLI_USAGE_ERROR, CliUsageError } from '../cli-usage-error';

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

const commandWithDoubleDashArgGroup = CliCommand({
	name: 'command-with-double-dash-arg-group',
	doubleDashArgGroup: dummyArgGroup,
	action(...args) {
		return args;
	},
});

const root = CliBranch({
	name: 'cli',
	subcommands: [
		commandWithNoArguments,
		commandWithPositionalArgGroup,
		commandWithNamedArgGroups,
		commandWithDoubleDashArgGroup,
	],
});

const cliApi = CliApi(root);

describe(CliApi.name, () => {
	it(`throws ${CLI_USAGE_ERROR} if --help is passed among the arguments of on an otherwise valid invocation`, async () => {
		const exception = await runAndCatch(CliApi(commandWithNoArguments), [
			'--help',
		]);
		expect(exception.code).toBe(CLI_USAGE_ERROR);
		expect(exception.message).toBeFalsy();
	});

	it(`throws ${CLI_USAGE_ERROR} if --help is passed among the commands`, async () => {
		const exception = await runAndCatch(cliApi, [
			'--help',
			commandWithNoArguments.name,
		]);
		expect(exception.code).toBe(CLI_USAGE_ERROR);
		expect((exception as CliUsageError).tree!.current).toBe(root);
		expect(exception.message).toBeFalsy();
	});

	it('throws USAGE error with empty message if last command is a branch and no additional args is present', async () => {
		const exception = await runAndCatch(cliApi, []);
		expect(exception.code).toBe(CLI_USAGE_ERROR);
		expect(exception.message).toBeFalsy();
	});

	it('throws USAGE error "bad command" if last command is a branch and additional args is present', async () => {
		const exception = await runAndCatch(cliApi, ['oops']);
		expect(exception.code).toBe(CLI_USAGE_ERROR);
		expect(exception.message).toMatch(/bad command/i);
		expect(exception.message).toMatch('"oops"');
		expect(exception.message).toMatchSnapshot();
	});

	it('throws USAGE error "positional arguments" if last command is a command without positionalArgGroup property and additional args are present', async () => {
		const exception = await runAndCatch(cliApi, [
			commandWithNamedArgGroups.name,
			'oops',
		]);
		expect(exception.code).toBe(CLI_USAGE_ERROR);
		expect(exception.message).toMatch('Unexpected argument "oops"');
		expect(exception.message).toMatch(commandWithNamedArgGroups.name);
		expect(exception.message).toMatch(/positional arguments/i);
		expect(exception.message).toMatchSnapshot();
	});

	it('Passes parsed positionalValue to the "action" function', async () => {
		const positionalArgs = ['foo', 'bar'];
		const result = await cliApi([
			commandWithPositionalArgGroup.name,
			...positionalArgs,
		]);
		expect(result[0].positionalValue).toEqual(
			dummyArgGroup.parse(positionalArgs),
		);
	});

	it('Passes parsed namedValues to the "action" function', async () => {
		const namedArgs = ['--foo', 'bar'];
		const result = await cliApi([commandWithNamedArgGroups.name, ...namedArgs]);
		expect(result[0].namedValues).toEqual({
			foo: dummyArgGroup.parse(['bar']),
		});
	});

	it(`Throws USAGE error 'does not allow "--"' if command does not have an "doubleDashArgGroup" property`, async () => {
		const exception = await runAndCatch(cliApi, [
			commandWithPositionalArgGroup.name,
			'--',
		]);
		expect(exception.code).toBe(CLI_USAGE_ERROR);
		expect(exception.message).toMatch(commandWithPositionalArgGroup.name);
		expect(exception.message).toMatch('does not allow "--"');
	});

	it('Passes parsed doubleDashValue to the "action" function', async () => {
		const result = await cliApi([commandWithDoubleDashArgGroup.name, '--']);
		expect(result[0].doubleDashValue).toEqual(
			commandWithDoubleDashArgGroup.doubleDashArgGroup!.parse([]),
		);
	});

	it('Passes undefined as the positionalValue when no positional args are passed', async () => {
		const result = await cliApi([commandWithPositionalArgGroup.name]);
		expect(result[0].positionalValue).toEqual(
			DUMMY_ARG_GROUP_UNDEFINED_WAS_PASSED,
		);
	});
});
