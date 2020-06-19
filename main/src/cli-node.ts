import { AnyArgGroup, AnyNamedArgGroups } from './cli-arg-group';
import { ICliBranch } from './cli-branch';
import { ICliCommand } from './cli-command';

export type CliNode = {
	current:
		| ICliBranch
		| ICliCommand<AnyArgGroup, AnyNamedArgGroups, AnyArgGroup>;
	parents: ICliBranch[];
};

export type CliCommandNode = {
	current: ICliCommand<AnyArgGroup, AnyNamedArgGroups, AnyArgGroup>;
	parents: ICliBranch[];
};
