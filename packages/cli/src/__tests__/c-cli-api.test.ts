import { runAndCatch } from '@carnesen/run-and-catch';
import { CCliCommand } from '../c-cli-command';
import {
	dummyOptionalArgGroup,
	DUMMY_ARG_GROUP_UNDEFINED_WAS_PASSED,
} from '../dummy-arg-groups';
import { CCliUsageError } from '../c-cli-usage-error';
import { CCli } from '../c-cli';
import { CCliCommandGroup } from '../c-cli-command-group';

const commandWithNoArguments = CCliCommand.create({
	name: 'command-with-no-args',
	action() {},
});

const commandWithNamedArgGroups = CCliCommand.create({
	name: 'command-with-named-args',
	namedArgGroups: {
		foo: dummyOptionalArgGroup,
	},
	action(...args) {
		return args;
	},
});

const commandWithPositionalArgGroup = CCliCommand.create({
	name: 'command-with-positional-args',
	positionalArgGroup: dummyOptionalArgGroup,
	action(...args) {
		return args;
	},
});

const commandWithDoubleDashArgGroup = CCliCommand.create({
	name: 'command-with-double-dash-arg-group',
	doubleDashArgGroup: dummyOptionalArgGroup,
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
	it(`throws ${CCliUsageError.name} if --help is passed among the arguments of on an otherwise valid invocation`, async () => {
		const exception = await runAndCatch(async () => {
			await CCli.create(commandWithNoArguments).api(['--help']);
		});
		expect(exception).toBeInstanceOf(CCliUsageError);
		expect(exception.message).toBeFalsy();
	});

	it(`throws ${CCliUsageError.name} if --help is passed among the commands`, async () => {
		const exception = await runAndCatch(cliApi, [
			'--help',
			commandWithNoArguments.name,
		]);
		expect(exception).toBeInstanceOf(CCliUsageError);
		expect((exception as CCliUsageError).tree!.current).toBe(root);
		expect(exception.message).toBeFalsy();
	});

	it('throws usage error with empty message if last command is a command group and no additional args is present', async () => {
		const exception = await runAndCatch(cliApi, []);
		expect(exception).toBeInstanceOf(CCliUsageError);
		expect(exception.message).toBeFalsy();
	});

	it('throws usage error "bad command" if last command is a command group and additional args is present', async () => {
		const exception = await runAndCatch(cliApi, ['oops']);
		expect(exception).toBeInstanceOf(CCliUsageError);
		expect(exception.message).toMatch(/bad command/i);
		expect(exception.message).toMatch('"oops"');
		expect(exception.message).toMatchSnapshot();
	});

	it('throws usage error "positional arguments" if last command is a command without positionalArgGroup property and additional args are present', async () => {
		const exception = await runAndCatch(cliApi, [
			commandWithNamedArgGroups.name,
			'oops',
		]);
		expect(exception).toBeInstanceOf(CCliUsageError);
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
			dummyOptionalArgGroup.parse(positionalArgs),
		);
	});

	it('Passes parsed namedValues to the "action" function', async () => {
		const namedArgs = ['--foo', 'bar'];
		const result = await cliApi([commandWithNamedArgGroups.name, ...namedArgs]);
		expect(result[0].namedValues).toEqual({
			foo: dummyOptionalArgGroup.parse(['bar']),
		});
	});

	it(`Throws usage error 'does not allow "--"' if command does not have an "doubleDashArgGroup" property`, async () => {
		const exception = await runAndCatch(cliApi, [
			commandWithPositionalArgGroup.name,
			'--',
		]);
		expect(exception).toBeInstanceOf(CCliUsageError);
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
