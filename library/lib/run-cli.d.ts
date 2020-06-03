import { BranchOrAnyCommand } from './types';
export declare type RunCli = (...args: string[]) => Promise<any>;
export declare type CliEnhancer = (runCli: RunCli) => RunCli;
/**
 *
 * @remarks
 * Returns a function of the form `(...args: string[]) => Promise<any>` that can be invoked as e.g. `cli('foo', 'bar')` for unit tests or as `cli(process.argv.slice(2))` in an executable CLI script.

 * @param rootCommand
 * @param options
 */
export declare function RunCli(rootCommand: BranchOrAnyCommand, options?: Partial<{
    enhancer: CliEnhancer;
}>): RunCli;
//# sourceMappingURL=run-cli.d.ts.map