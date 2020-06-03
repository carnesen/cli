import { CliEnhancer } from './run-cli';
import { ICliBranch } from './cli-branch';
import { ICliCommand } from './cli-command';
export declare type RunCliAndExitOptions = Partial<{
    args: string[];
    enhancer: CliEnhancer;
    processExit: (code?: number) => any;
    consoleLog: typeof console.log;
    consoleError: typeof console.error;
}>;
export declare function runCliAndExit(rootCommand: ICliBranch | ICliCommand<any, any, any>, options?: RunCliAndExitOptions): Promise<void>;
//# sourceMappingURL=run-cli-and-exit.d.ts.map