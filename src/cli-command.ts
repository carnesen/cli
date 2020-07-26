import { TValueFromCliArgGroup, ICliArgGroup } from './cli-arg-group';
import { ICliConsole } from './cli-console';
import { ICliAnsi } from './cli-ansi';

/** "kind" of a [[`ICliCommand`]] */
export const CLI_COMMAND = 'CLI_COMMAND';

/** Options for [[`CliCommand`]] */
export interface ICliCommandOptions<
	TPositionalArgGroup extends ICliArgGroup = ICliArgGroup,
	TNamedArgGroups extends {
		[name: string]: ICliArgGroup;
	} = {
		[name: string]: ICliArgGroup;
	},
	TDoubleDashArgGroup extends ICliArgGroup = ICliArgGroup
> {
	/** Identifier for this command in command-line usage */
	name: string;

	/** Function or async function that implements the command */
	action: (input: {
		positionalValue: TValueFromCliArgGroup<TPositionalArgGroup>;
		namedValues: {
			[K in keyof TNamedArgGroups]: TValueFromCliArgGroup<TNamedArgGroups[K]>;
		};
		doubleDashValue: TValueFromCliArgGroup<TDoubleDashArgGroup>;
		console: ICliConsole;
		ansi: ICliAnsi;
	}) => any;

	/** A [[`ICliArgGroup`]] for the arguments before the first separator argument */
	positionalArgGroup?: TPositionalArgGroup;

	/** A [[`ICliArgGroup`]] for the arguments passed as "--name value" */
	namedArgGroups?: TNamedArgGroups;

	/** A [[`ICliArgGroup`]] for the arguments after a lone "--" */
	doubleDashArgGroup?: TDoubleDashArgGroup;

	/** A sentence or two about this command for command-line usage */
	description?: string;

	/** If `true`, don't show this command in command-line usage */
	hidden?: boolean;
}

/** An object that defines a CLI command and its arguments */
export interface ICliCommand<
	TPositionalArgGroup extends ICliArgGroup = ICliArgGroup,
	TNamedArgGroups extends {
		[name: string]: ICliArgGroup;
	} = {
		[name: string]: ICliArgGroup;
	},
	TDoubleDashArgGroup extends ICliArgGroup = ICliArgGroup
>
	extends ICliCommandOptions<
		TPositionalArgGroup,
		TNamedArgGroups,
		TDoubleDashArgGroup
	> {
	/** The string literal [[`CLI_COMMAND`]] */
	kind: typeof CLI_COMMAND;
}

/** A factory for [[`ICliCommand`]]s */
export function CliCommand<
	TPositionalArgGroup extends ICliArgGroup = ICliArgGroup<unknown, false>,
	TNamedArgGroups extends {
		[name: string]: ICliArgGroup;
	} = {
		[name: string]: ICliArgGroup;
	},
	TDoubleDashArgGroup extends ICliArgGroup = ICliArgGroup<unknown, false>
>(
	options: ICliCommandOptions<
		TPositionalArgGroup,
		TNamedArgGroups,
		TDoubleDashArgGroup
	>,
): ICliCommand<TPositionalArgGroup, TNamedArgGroups, TDoubleDashArgGroup> {
	return {
		...options,
		kind: CLI_COMMAND,
	};
}
