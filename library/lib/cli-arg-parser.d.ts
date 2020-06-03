declare type MaybeArgs<TRequired extends boolean> = TRequired extends true ? string[] : string[] | undefined;
/**
 * Interface describing the "argument parser" object
 * @remarks
 * An arg parser is an object that converts command-line arguments (strings) into
 * strictly-typed values.
 * @typeParam TValue Type of the value returned by `#parse`
 * @typeParam TRequired If `true`, throw in `parse` if `args.length === 0`
 */
export interface ICliArgParser<TValue extends any, TRequired extends boolean = boolean> {
    description?: string;
    hidden?: boolean;
    parse: ((args: MaybeArgs<TRequired>) => TValue) | ((args: MaybeArgs<TRequired>) => Promise<TValue>);
    placeholder: string;
    required?: TRequired;
}
export declare type AnyArgParser = ICliArgParser<any>;
export declare type ValueFromArgParser<TArgParser> = TArgParser extends ICliArgParser<infer U, any> ? U : never;
export declare type AnyNamedArgParsers = {
    [name: string]: AnyArgParser;
};
export declare type NamedValues<TNamedArgParsers extends AnyNamedArgParsers> = {
    [K in keyof TNamedArgParsers]: ValueFromArgParser<TNamedArgParsers[K]>;
};
export {};
//# sourceMappingURL=cli-arg-parser.d.ts.map