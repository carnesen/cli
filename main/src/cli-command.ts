import {
	AnyArgGroup,
	AnyNamedArgGroups,
	TValueFromCliArgGroup,
	NamedValues,
	ICliArgGroup,
} from './cli-arg-group';

/** "kind" of a [[`ICliCommand`]] */
export const CLI_COMMAND = 'CLI_COMMAND';

/** Options for [[`CliCommand`]] */
export interface ICliCommandOptions<
	TPositionalArgGroup extends AnyArgGroup,
	TNamedArgGroups extends AnyNamedArgGroups,
	TEscapedArgGroup extends AnyArgGroup
> {
	/** Identifier for this command in command-line usage */
	name: string;

	/** Function or async function that implements the command */
	action: (
		positionalValue: TValueFromCliArgGroup<TPositionalArgGroup>,
		namedValues: NamedValues<TNamedArgGroups>,
		escapedValue: TValueFromCliArgGroup<TEscapedArgGroup>,
	) => any;

	/** A [[`ICliArgGroup`]] for the arguments before the first separator argument */
	positionalArgGroup?: TPositionalArgGroup;

	/** A [[`ICliArgGroup`]] for the arguments passed as "--name value" */
	namedArgGroups?: TNamedArgGroups;

	/** A [[`ICliArgGroup`]] for the arguments after a lone "--" */
	escapedArgGroup?: TEscapedArgGroup;

	/** A sentence or two about this command for command-line usage */
	description?: string;

	/** If `true`, don't show this command in command-line usage */
	hidden?: boolean;
}

/** An object that defines a CLI command and its arguments */
export interface ICliCommand<
	TPositionalArgGroup extends AnyArgGroup,
	TNamedArgGroups extends AnyNamedArgGroups,
	TEscapedArgGroup extends AnyArgGroup
>
	extends ICliCommandOptions<
		TPositionalArgGroup,
		TNamedArgGroups,
		TEscapedArgGroup
	> {
	/** The string literal [[`CLI_COMMAND`]] */
	kind: typeof CLI_COMMAND;
}

/** A factory for [[`ICliCommand`]]s */
export function CliCommand<
	TPositionalArgGroup extends AnyArgGroup = ICliArgGroup<undefined, false>,
	TNamedArgGroups extends AnyNamedArgGroups = any,
	TEscapedArgGroup extends AnyArgGroup = ICliArgGroup<undefined, false>
>(
	options: ICliCommandOptions<
		TPositionalArgGroup,
		TNamedArgGroups,
		TEscapedArgGroup
	>,
): ICliCommand<TPositionalArgGroup, TNamedArgGroups, TEscapedArgGroup> {
	return {
		...options,
		kind: CLI_COMMAND,
	};
}
