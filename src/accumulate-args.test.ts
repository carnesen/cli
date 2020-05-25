import { accumulateArgs } from './accumulate-args';

type Datum = {
  args: string[];
  result: ReturnType<typeof accumulateArgs>;
};

const data: Datum[] = [
  {
    args: ['foo', 'bar', '--baz', 'jane', 'doe'],
    result: {
      commandNamesAndPositionalArgs: ['foo', 'bar'],
      foundHelp: false,
      namedArgs: { baz: ['jane', 'doe'] },
      escapedArgs: undefined,
    },
  },
  {
    args: ['foo', 'bar', '--baz', 'jane', '--baz', 'doe'],
    result: {
      commandNamesAndPositionalArgs: ['foo', 'bar'],
      foundHelp: false,
      namedArgs: { baz: ['jane', 'doe'] },
      escapedArgs: undefined,
    },
  },
  {
    args: ['--', '--foo', '--bar'],
    result: {
      commandNamesAndPositionalArgs: [],
      foundHelp: false,
      namedArgs: {},
      escapedArgs: ['--foo', '--bar'],
    },
  },
  {
    args: ['--'],
    result: {
      commandNamesAndPositionalArgs: [],
      foundHelp: false,
      namedArgs: {},
      escapedArgs: [],
    },
  },
  {
    args: ['--foo'],
    result: {
      commandNamesAndPositionalArgs: [],
      foundHelp: false,
      namedArgs: { foo: [] },
      escapedArgs: undefined,
    },
  },
  {
    args: ['foo', 'bar', '--help', 'baz'],
    result: {
      commandNamesAndPositionalArgs: ['foo', 'bar', 'baz'],
      foundHelp: true,
      namedArgs: {},
      escapedArgs: undefined,
    },
  },
  {
    args: ['--', '--help', 'baz'],
    result: {
      commandNamesAndPositionalArgs: [],
      foundHelp: false,
      namedArgs: {},
      escapedArgs: ['--help', 'baz'],
    },
  },
];

describe(accumulateArgs.name, () => {
  for (const { args, result } of data) {
    it(`${args.join(' ')}`, () => {
      expect(accumulateArgs(args)).toEqual(result);
    });
  }
});
