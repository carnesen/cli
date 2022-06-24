import { runAndCatch } from '@carnesen/run-and-catch';

import { parseArgs } from '../parse-args';
import {
	dummyOptionalArgGroup,
	dummyNonOptionalArgGroup,
	DUMMY_ARG_GROUP_THROWN_INTENTIONALLY,
	DUMMY_ARG_GROUP_THROW,
	DUMMY_ARG_GROUP_THROW_NON_TRUTHY,
} from '../dummy-arg-groups';
import { CCliUsageError } from '../c-cli-usage-error';

describe(parseArgs.name, () => {
	it(`returns parse(args) if an args with length >= 1 is passed`, async () => {
		const args = ['foo'];
		expect(await parseArgs(dummyOptionalArgGroup, args, undefined)).toBe(
			dummyOptionalArgGroup.parse(args),
		);
		expect(await parseArgs(dummyNonOptionalArgGroup, args, undefined)).toBe(
			dummyNonOptionalArgGroup.parse(args),
		);
	});

	it(`if not optional, returns parse(args) if args is an empty array or undefined`, async () => {
		expect(await parseArgs(dummyOptionalArgGroup, [], undefined)).toBe(
			dummyOptionalArgGroup.parse([]),
		);
		expect(await parseArgs(dummyOptionalArgGroup, undefined, undefined)).toBe(
			dummyOptionalArgGroup.parse(undefined),
		);
	});

	it(`throws usage error "argument is not optional" if args is an empty array or undefined`, async () => {
		for (const args of [undefined, [] as string[]]) {
			const exception = await runAndCatch(
				parseArgs,
				dummyNonOptionalArgGroup,
				args,
				undefined,
			);
			expect(exception).toBeInstanceOf(CCliUsageError);
			expect(exception.message).toMatch(/argument is not optional/i);
			expect(exception.message).toMatch(
				dummyNonOptionalArgGroup.placeholder || '',
			);
		}
	});

	it(`if throws "argument is not optional", expect message to match snapshot`, async () => {
		const exception = await runAndCatch(
			parseArgs,
			dummyNonOptionalArgGroup,
			undefined,
			undefined,
		);
		expect(exception.message).toMatch('argument is not optional');
		expect(exception.message).toMatchSnapshot();
	});

	it(`if throws "argument is not optional" with context, expect message to match snapshot`, async () => {
		const exception = await runAndCatch(
			parseArgs,
			dummyNonOptionalArgGroup,
			undefined,
			'context',
		);
		expect(exception.message).toMatch('argument is not optional');
		expect(exception.message).toMatchSnapshot();
	});

	it(`throws if parse does with a context/placeholder enhanced message`, async () => {
		const exception = await runAndCatch(
			parseArgs,
			dummyOptionalArgGroup,
			[DUMMY_ARG_GROUP_THROW],
			undefined,
		);
		expect(exception.message).toMatch(DUMMY_ARG_GROUP_THROWN_INTENTIONALLY);
		expect(exception.message).toMatch(dummyOptionalArgGroup.placeholder || '');
		expect(exception.message).toMatchSnapshot();
	});

	it(`just re-throws exception if parse throws a non-truthy exception`, async () => {
		const exception = await runAndCatch(
			parseArgs,
			dummyOptionalArgGroup,
			[DUMMY_ARG_GROUP_THROW_NON_TRUTHY],
			undefined,
		);
		expect(exception).not.toBeTruthy();
	});
});
