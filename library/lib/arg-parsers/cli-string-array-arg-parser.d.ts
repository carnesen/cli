import { ICliArgParser } from '../cli-arg-parser';
declare type Config = Partial<{
    description: string;
    required: boolean;
    hidden: boolean;
    placeholder: string;
}>;
declare function CliStringArrayArgParser(config: Config & {
    required: true;
}): ICliArgParser<string[], true>;
declare function CliStringArrayArgParser(config?: Config): ICliArgParser<string[] | undefined, boolean>;
export { CliStringArrayArgParser };
//# sourceMappingURL=cli-string-array-arg-parser.d.ts.map