"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const partition_args_1 = require("./partition-args");
const data = [
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
describe(partition_args_1.partitionArgs.name, () => {
    for (const { args, result } of data) {
        it(`${args.join(' ')}`, () => {
            expect(partition_args_1.partitionArgs(args)).toEqual(result);
        });
    }
});
//# sourceMappingURL=partition-args.test.js.map