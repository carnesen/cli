import { ValueFromCliArgGroup, CliArgGroup } from './cli-arg-group';
import { CliLogger } from './cli-logger';
import { CliColor } from './cli-color';
import { AnyCliDescription } from './cli-description';

/** "kind" of a [[`ICliCommand`]] */
export const CLI_COMMAND = 'CLI_COMMAND';

/** Options for [[`CliCommand`]] */
export type CliCommandOptions<
	PositionalArgGroup extends CliArgGroup = CliArgGroup,
	NamedArgGroups extends {
		[name: string]: CliArgGroup;
	} = {
		[name: string]: CliArgGroup;
	},
	DoubleDashArgGroup extends CliArgGroup = CliArgGroup,
> = {
	/** Identifier for this command in command-line usage */
	name: string;

	/** Function or async function that implements the command */
	action: (input: {
		/** @deprecated Use `color` instead */
		ansi: CliColor;
		color: CliColor;
		/** @deprecated Use `logger` instead */
		console: CliLogger;
		doubleDashValue: ValueFromCliArgGroup<DoubleDashArgGroup>;
		logger: CliLogger;
		namedValues: {
			[K in keyof NamedArgGroups]: ValueFromCliArgGroup<NamedArgGroups[K]>;
		};
		positionalValue: ValueFromCliArgGroup<PositionalArgGroup>;
	}) => any;

	/** A [[`CliArgGroup`]] for the arguments before the first separator argument */
	positionalArgGroup?: PositionalArgGroup;

	/** A [[`CliArgGroup`]] for the arguments passed as "--name value" */
	namedArgGroups?: NamedArgGroups;

	/** A [[`CliArgGroup`]] for the arguments after a lone "--" */
	doubleDashArgGroup?: DoubleDashArgGroup;

	/** A sentence or two about this command for command-line usage */
	description?: AnyCliDescription;

	/** If `true`, don't show this command in command-line usage */
	hidden?: boolean;
};

/** An object that defines a CLI command and its arguments */
export interface ICliCommand<
	PositionalArgGroup extends CliArgGroup = CliArgGroup,
	NamedArgGroups extends {
		[name: string]: CliArgGroup;
	} = {
		[name: string]: CliArgGroup;
	},
	DoubleDashArgGroup extends CliArgGroup = CliArgGroup,
> extends CliCommandOptions<
		PositionalArgGroup,
		NamedArgGroups,
		DoubleDashArgGroup
	> {
	/** The string literal [[`CLI_COMMAND`]] */
	kind: typeof CLI_COMMAND;
}

/** A factory for [[`ICliCommand`]]s */
export function CliCommand<
	PositionalArgGroup extends CliArgGroup = CliArgGroup<unknown, false>,
	NamedArgGroups extends {
		[name: string]: CliArgGroup;
	} = {
		[name: string]: CliArgGroup;
	},
	DoubleDashArgGroup extends CliArgGroup = CliArgGroup<unknown, false>,
>(
	options: CliCommandOptions<
		PositionalArgGroup,
		NamedArgGroups,
		DoubleDashArgGroup
	>,
): ICliCommand<PositionalArgGroup, NamedArgGroups, DoubleDashArgGroup> {
	return {
		...options,
		kind: CLI_COMMAND,
	};
}
