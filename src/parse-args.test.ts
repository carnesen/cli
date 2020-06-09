import { runAndCatch } from '@carnesen/run-and-catch';

import { parseArgs } from './parse-args';
import { CLI_USAGE_ERROR } from './cli-usage-error';
import {
	dummyValuedParser,
	dummyRequiredValuedParser,
	DUMMY_ARG_PARSER_THROWN_INTENTIONALLY,
	DUMMY_ARG_PARSER_THROW,
	DUMMY_ARG_PARSER_THROW_NON_TRUTHY,
} from './dummy-arg-parsers-for-testing';
import { CliCommand } from './cli-command';
import { CliCommandNode } from './cli-node';

const node: CliCommandNode = {
	current: CliCommand({ name: 'foo', action() {} }),
	parents: [],
};

describe(parseArgs.name, () => {
	it(`returns parse(args) if an args with length >= 1 is passed`, async () => {
		const args = ['foo'];
		expect(await parseArgs(dummyValuedParser, args, undefined, node)).toBe(
			dummyValuedParser.parse(args),
		);
		expect(
			await parseArgs(dummyRequiredValuedParser, args, undefined, node),
		).toBe(dummyRequiredValuedParser.parse(args));
	});

	it(`if not required, returns parse(args) if args is an empty array or undefined`, async () => {
		expect(await parseArgs(dummyValuedParser, [], undefined, node)).toBe(
			dummyValuedParser.parse([]),
		);
		expect(await parseArgs(dummyValuedParser, undefined, undefined, node)).toBe(
			dummyValuedParser.parse(undefined),
		);
	});

	it(`if required, throws usage error "argument is required" if args is an empty array or undefined`, async () => {
		for (const args of [undefined, [] as string[]]) {
			const exception = await runAndCatch(
				parseArgs,
				dummyRequiredValuedParser,
				args,
				undefined,
				node,
			);
			expect(exception.code).toBe(CLI_USAGE_ERROR);
			expect(exception.message).toMatch(/argument is required/i);
			expect(exception.message).toMatch(dummyRequiredValuedParser.placeholder);
		}
	});

	it(`if throws "argument is required", expect message to match snapshot`, async () => {
		const exception = await runAndCatch(
			parseArgs,
			dummyRequiredValuedParser,
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
			dummyRequiredValuedParser,
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
			dummyValuedParser,
			[DUMMY_ARG_PARSER_THROW],
			undefined,
			node,
		);
		expect(exception.message).toMatch(DUMMY_ARG_PARSER_THROWN_INTENTIONALLY);
		expect(exception.message).toMatch(dummyValuedParser.placeholder);
		expect(exception.message).toMatchSnapshot();
	});

	it(`just re-throws exception if parse throws a non-truthy exception`, async () => {
		const exception = await runAndCatch(
			parseArgs,
			dummyValuedParser,
			[DUMMY_ARG_PARSER_THROW_NON_TRUTHY],
			undefined,
			node,
		);
		expect(exception).not.toBeTruthy();
	});
});
