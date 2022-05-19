import { ICliCommand } from './cli-command';
import { AnyCliDescription } from './cli-description';

/** "kind" of an [[`ICliCommandGroup`]] */
export const CLI_COMMAND_GROUP = 'CLI_COMMAND_GROUP';

/** Options for [[`CliCommandGroup`]] */
export type CliCommandGroupOptions = {
	/** Name of this command group */
	name: string;

	/** A short description for command-line usage */
	description?: AnyCliDescription;

	/** If `true`, hide these commands in command-line usage */
	hidden?: boolean;

	/** The [[`ICliCommandGroup`]]s and/or [[`ICliCommand`]]s in this group */
	subcommands: (ICliCommandGroup | ICliCommand<any, any, any>)[];
};

/**
 * A group of related commands
 */
export type ICliCommandGroup = CliCommandGroupOptions & {
	/** Used internally for discriminating between [[`ICliCommandGroup`]]'s and
	 * [[`ICliCommand`]]'s */
	kind: typeof CLI_COMMAND_GROUP;
};

/**
 * A factory for [[`ICliCommandGroup`]]s
 * @param options
 * @returns An [[`ICliCommandGroup`]] object
 * @example
 * ```typescript
 * const cloudCommandGroup = CliCommandGroup()
 * ```
 */
export function cliCommandGroupFactory(
	options: CliCommandGroupOptions,
): ICliCommandGroup {
	return {
		...options,
		kind: CLI_COMMAND_GROUP,
	};
}
