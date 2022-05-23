import { CCliCommand } from './c-cli-command';
import { CCliAnyDescription } from './c-cli-description';

/** Options for {@link CliCommandGroup} */
export type CCliCommandGroupOptions = {
	/** Name of this command group */
	name: string;

	/** A short description for command-line usage */
	description?: CCliAnyDescription;

	/** If `true`, hide these commands in command-line usage */
	hidden?: boolean;

	/** The {@link ICliCommandGroup`]]s and/or [[`ICliCommand}s in this group */
	subcommands: (CCliCommandGroup | CCliCommand<any, any, any>)[];
};

export class CCliCommandGroup {
	protected constructor(public readonly options: CCliCommandGroupOptions) {}

	public static create(options: CCliCommandGroupOptions): CCliCommandGroup {
		return new CCliCommandGroup(options);
	}
}
