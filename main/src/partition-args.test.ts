import { partitionArgs } from './partition-args';

type Datum = {
	args: string[];
	result: ReturnType<typeof partitionArgs>;
};

const data: Datum[] = [
	{
		args: ['foo', 'bar', '--baz', 'jane', 'doe'],
		result: {
			positionalArgs: ['foo', 'bar'],
			namedArgs: { baz: ['jane', 'doe'] },
			doubleDashArgs: undefined,
		},
	},
	{
		args: ['foo', 'bar', '--baz', 'jane', '--baz', 'doe'],
		result: {
			positionalArgs: ['foo', 'bar'],
			namedArgs: { baz: ['jane', 'doe'] },
			doubleDashArgs: undefined,
		},
	},
	{
		args: ['--', '--foo', '--bar'],
		result: {
			positionalArgs: [],
			namedArgs: {},
			doubleDashArgs: ['--foo', '--bar'],
		},
	},
	{
		args: ['--'],
		result: {
			positionalArgs: [],
			namedArgs: {},
			doubleDashArgs: [],
		},
	},
	{
		args: ['--foo'],
		result: {
			positionalArgs: [],
			namedArgs: { foo: [] },
			doubleDashArgs: undefined,
		},
	},
	{
		args: ['foo', 'bar', '--help', 'baz'],
		result: {
			positionalArgs: ['foo', 'bar'],
			namedArgs: {
				help: ['baz'],
			},
			doubleDashArgs: undefined,
		},
	},
	{
		args: ['--', '--help', 'baz'],
		result: {
			positionalArgs: [],
			namedArgs: {},
			doubleDashArgs: ['--help', 'baz'],
		},
	},
];

describe(partitionArgs.name, () => {
	for (const { args, result } of data) {
		it(`${args.join(' ')}`, () => {
			expect(partitionArgs(args)).toEqual(result);
		});
	}
});
