export declare type NamedArgs = {
    [argName: string]: string[] | undefined;
};
export declare function partitionArgs(args: string[]): {
    positionalArgs: string[];
    escapedArgs: string[] | undefined;
    namedArgs: NamedArgs;
};
//# sourceMappingURL=partition-args.d.ts.map