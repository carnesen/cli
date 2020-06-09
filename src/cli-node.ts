import { AnyParser, AnyNamedParsers } from './cli-parser';
import { ICliBranch } from './cli-branch';
import { ICliCommand } from './cli-command';

export type CliNode = {
	current: ICliBranch | ICliCommand<AnyParser, AnyNamedParsers, AnyParser>;
	parents: ICliBranch[];
};

export type CliCommandNode = {
	current: ICliCommand<AnyParser, AnyNamedParsers, AnyParser>;
	parents: ICliBranch[];
};
