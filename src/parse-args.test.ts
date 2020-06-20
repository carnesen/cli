import { runAndCatch } from '@carnesen/run-and-catch';

import { parseArgs } from './parse-args';
import { CLI_USAGE_ERROR } from './cli-usage-error';
import {
	dummyArgGroup,
	dummyRequiredArgGroup,
	DUMMY_ARG_GROUP_THROWN_INTENTIONALLY,
	DUMMY_ARG_GROUP_THROW,
	DUMMY_ARG_GROUP_THROW_NON_TRUTHY,
} from './dummy-arg-groups-for-testing';

describe(parseArgs.name, () => {
	it(`returns parse(args) if an args with length >= 1 is passed`, async () => {
		const args = ['foo'];
		expect(await parseArgs(dummyArgGroup, args, undefined)).toBe(
			dummyArgGroup.parse(args),
		);
		expect(await parseArgs(dummyRequiredArgGroup, args, undefined)).toBe(
			dummyRequiredArgGroup.parse(args),
		);
	});

	it(`if not required, returns parse(args) if args is an empty array or undefined`, async () => {
		expect(await parseArgs(dummyArgGroup, [], undefined)).toBe(
			dummyArgGroup.parse([]),
		);
		expect(await parseArgs(dummyArgGroup, undefined, undefined)).toBe(
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
		);
		expect(exception).not.toBeTruthy();
	});
});
