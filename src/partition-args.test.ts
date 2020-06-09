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
			escapedArgs: undefined,
		},
	},
	{
		args: ['foo', 'bar', '--baz', 'jane', '--baz', 'doe'],
		result: {
			positionalArgs: ['foo', 'bar'],
			namedArgs: { baz: ['jane', 'doe'] },
			escapedArgs: undefined,
		},
	},
	{
		args: ['--', '--foo', '--bar'],
		result: {
			positionalArgs: [],
			namedArgs: {},
			escapedArgs: ['--foo', '--bar'],
		},
	},
	{
		args: ['--'],
		result: {
			positionalArgs: [],
			namedArgs: {},
			escapedArgs: [],
		},
	},
	{
		args: ['--foo'],
		result: {
			positionalArgs: [],
			namedArgs: { foo: [] },
			escapedArgs: undefined,
		},
	},
	{
		args: ['foo', 'bar', '--help', 'baz'],
		result: {
			positionalArgs: ['foo', 'bar'],
			namedArgs: {
				help: ['baz'],
			},
			escapedArgs: undefined,
		},
	},
	{
		args: ['--', '--help', 'baz'],
		result: {
			positionalArgs: [],
			namedArgs: {},
			escapedArgs: ['--help', 'baz'],
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
