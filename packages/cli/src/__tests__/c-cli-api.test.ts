import { runAndCatch } from '@carnesen/run-and-catch';
import { CCliCommand } from '../c-cli-command';
import {
	dummyArgGroup,
	DUMMY_ARG_GROUP_UNDEFINED_WAS_PASSED,
} from '../dummy-arg-groups';
import { C_CLI_USAGE_ERROR, CCliUsageError } from '../c-cli-usage-error';
import { CCli } from '../c-cli';
import { CCliCommandGroup } from '../c-cli-command-group';

const commandWithNoArguments = CCliCommand.create({
	name: 'command-with-no-args',
	action() {},
});

const commandWithNamedArgGroups = CCliCommand.create({
	name: 'command-with-named-args',
	namedArgGroups: {
		foo: dummyArgGroup,
	},
	action(...args) {
		return args;
	},
});

const commandWithPositionalArgGroup = CCliCommand.create({
	name: 'command-with-positional-args',
	positionalArgGroup: dummyArgGroup,
	action(...args) {
		return args;
	},
});

const commandWithDoubleDashArgGroup = CCliCommand.create({
	name: 'command-with-double-dash-arg-group',
	doubleDashArgGroup: dummyArgGroup,
	action(...args) {
		return args;
	},
});

const root = CCliCommandGroup.create({
	name: 'cli',
	subcommands: [
		commandWithNoArguments,
		commandWithPositionalArgGroup,
		commandWithNamedArgGroups,
		commandWithDoubleDashArgGroup,
	],
});

const cli = CCli.create(root);
const cliApi = async (args: string[]) => await cli.api(args);

describe(CCli.prototype.api.name, () => {
	it(`throws ${C_CLI_USAGE_ERROR} if --help is passed among the arguments of on an otherwise valid invocation`, async () => {
		const exception = await runAndCatch(async () => {
			await CCli.create(commandWithNoArguments).api(['--help']);
		});
		expect(exception.code).toBe(C_CLI_USAGE_ERROR);
		expect(exception.message).toBeFalsy();
	});

	it(`throws ${C_CLI_USAGE_ERROR} if --help is passed among the commands`, async () => {
		const exception = await runAndCatch(cliApi, [
			'--help',
			commandWithNoArguments.options.name,
		]);
		expect(exception.code).toBe(C_CLI_USAGE_ERROR);
		expect((exception as CCliUsageError).tree!.current).toBe(root);
		expect(exception.message).toBeFalsy();
	});

	it('throws USAGE error with empty message if last command is a command group and no additional args is present', async () => {
		const exception = await runAndCatch(cliApi, []);
		expect(exception.code).toBe(C_CLI_USAGE_ERROR);
		expect(exception.message).toBeFalsy();
	});

	it('throws USAGE error "bad command" if last command is a command group and additional args is present', async () => {
		const exception = await runAndCatch(cliApi, ['oops']);
		expect(exception.code).toBe(C_CLI_USAGE_ERROR);
		expect(exception.message).toMatch(/bad command/i);
		expect(exception.message).toMatch('"oops"');
		expect(exception.message).toMatchSnapshot();
	});

	it('throws USAGE error "positional arguments" if last command is a command without positionalArgGroup property and additional args are present', async () => {
		const exception = await runAndCatch(cliApi, [
			commandWithNamedArgGroups.options.name,
			'oops',
		]);
		expect(exception.code).toBe(C_CLI_USAGE_ERROR);
		expect(exception.message).toMatch('Unexpected argument "oops"');
		expect(exception.message).toMatch(commandWithNamedArgGroups.options.name);
		expect(exception.message).toMatch(/positional arguments/i);
		expect(exception.message).toMatchSnapshot();
	});

	it('Passes parsed positionalValue to the "action" function', async () => {
		const positionalArgs = ['foo', 'bar'];
		const result = await cliApi([
			commandWithPositionalArgGroup.options.name,
			...positionalArgs,
		]);
		expect(result[0].positionalValue).toEqual(
			dummyArgGroup.parse(positionalArgs),
		);
	});

	it('Passes parsed namedValues to the "action" function', async () => {
		const namedArgs = ['--foo', 'bar'];
		const result = await cliApi([
			commandWithNamedArgGroups.options.name,
			...namedArgs,
		]);
		expect(result[0].namedValues).toEqual({
			foo: dummyArgGroup.parse(['bar']),
		});
	});

	it(`Throws USAGE error 'does not allow "--"' if command does not have an "doubleDashArgGroup" property`, async () => {
		const exception = await runAndCatch(cliApi, [
			commandWithPositionalArgGroup.options.name,
			'--',
		]);
		expect(exception.code).toBe(C_CLI_USAGE_ERROR);
		expect(exception.message).toMatch(
			commandWithPositionalArgGroup.options.name,
		);
		expect(exception.message).toMatch('does not allow "--"');
	});

	it('Passes parsed doubleDashValue to the "action" function', async () => {
		const result = await cliApi([
			commandWithDoubleDashArgGroup.options.name,
			'--',
		]);
		expect(result[0].doubleDashValue).toEqual(
			commandWithDoubleDashArgGroup.options.doubleDashArgGroup!.parse([]),
		);
	});

	it('Passes undefined as the positionalValue when no positional args are passed', async () => {
		const result = await cliApi([commandWithPositionalArgGroup.options.name]);
		expect(result[0].positionalValue).toEqual(
			DUMMY_ARG_GROUP_UNDEFINED_WAS_PASSED,
		);
	});
});
