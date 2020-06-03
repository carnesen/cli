import { CommandStack } from './types';
import { NamedArgs } from './partition-args';
import { AnyNamedArgParsers, NamedValues } from './cli-arg-parser';
export declare function getNamedValues(namedArgParsers: AnyNamedArgParsers, namedArgs: NamedArgs, commandStack: CommandStack): Promise<NamedValues<AnyNamedArgParsers>>;
//# sourceMappingURL=get-named-values.d.ts.map