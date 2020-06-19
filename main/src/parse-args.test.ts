import { runAndCatch } from '@carnesen/run-and-catch';

import { parseArgs } from './parse-args';
import { CLI_USAGE_ERROR, CliUsageError } from './cli-usage-error';
import {
	dummyArgGroup,
	dummyRequiredArgGroup,
	DUMMY_ARG_GROUP_THROWN_INTENTIONALLY,
	DUMMY_ARG_GROUP_THROW,
	DUMMY_ARG_GROUP_THROW_NON_TRUTHY,
	DUMMY_ARG_GROUP_USAGE_ERROR,
} from './dummy-arg-groups-for-testing';
import { CliCommand } from './cli-command';
import { CliCommandNode } from './cli-node';

const node: CliCommandNode = {
	current: CliCommand({ name: 'foo', action() {} }),
	parents: [],
};

describe(parseArgs.name, () => {
	it(`returns parse(args) if an args with length >= 1 is passed`, async () => {
		const args = ['foo'];
		expect(await parseArgs(dummyArgGroup, args, undefined, node)).toBe(
			dummyArgGroup.parse(args),
		);
		expect(await parseArgs(dummyRequiredArgGroup, args, undefined, node)).toBe(
			dummyRequiredArgGroup.parse(args),
		);
	});

	it(`if not required, returns parse(args) if args is an empty array or undefined`, async () => {
		expect(await parseArgs(dummyArgGroup, [], undefined, node)).toBe(
			dummyArgGroup.parse([]),
		);
		expect(await parseArgs(dummyArgGroup, undefined, undefined, node)).toBe(
			dummyArgGroup.parse(undefined),
		);
	});

	it(`if required, throws usage error "argument is required" if args is an empty array or undefined`, async () => {
		for (const args of [undefined, [] as string[]]) {
			const exception = await runAndCatch(
				parseArgs,
				dummyRequiredArgGroup,
				args,
				undefined,
				node,
			);
			expect(exception.code).toBe(CLI_USAGE_ERROR);
			expect(exception.message).toMatch(/argument is required/i);
			expect(exception.message).toMatch(dummyRequiredArgGroup.placeholder);
		}
	});

	it(`if throws "argument is required", expect message to match snapshot`, async () => {
		const exception = await runAndCatch(
			parseArgs,
			dummyRequiredArgGroup,
			undefined,
			undefined,
			node,
		);
		expect(exception.message).toMatch('argument is required');
		expect(exception.message).toMatchSnapshot();
	});

	it(`if throws "argument is required" with context, expect message to match snapshot`, async () => {
		const exception = await runAndCatch(
			parseArgs,
			dummyRequiredArgGroup,
			undefined,
			'context',
			node,
		);
		expect(exception.message).toMatch('argument is required');
		expect(exception.message).toMatchSnapshot();
	});

	it(`throws if parse does with a context/placeholder enhanced message`, async () => {
		const exception = await runAndCatch(
			parseArgs,
			dummyArgGroup,
			[DUMMY_ARG_GROUP_THROW],
			undefined,
			node,
		);
		expect(exception.message).toMatch(DUMMY_ARG_GROUP_THROWN_INTENTIONALLY);
		expect(exception.message).toMatch(dummyArgGroup.placeholder);
		expect(exception.message).toMatchSnapshot();
	});

	it(`just re-throws exception if parse throws a non-truthy exception`, async () => {
		const exception = await runAndCatch(
			parseArgs,
			dummyArgGroup,
			[DUMMY_ARG_GROUP_THROW_NON_TRUTHY],
			undefined,
			node,
		);
		expect(exception).not.toBeTruthy();
	});

	it(`Attaches a "node" property to any ${CliUsageError.name} thrown`, async () => {
		const exception = await runAndCatch(
			parseArgs,
			dummyArgGroup,
			[DUMMY_ARG_GROUP_USAGE_ERROR],
			undefined,
			node,
		);
		expect(exception.node).toBe(node);
	});
});
