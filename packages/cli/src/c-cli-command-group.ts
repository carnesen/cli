import { CCliCommand } from './c-cli-command';
import { CCliDescription } from './c-cli-description';

export type CCliSubcommand = CCliCommandGroup | CCliCommand<any, any, any>;

/** Options for {@link CliCommandGroup} */
export type CCliCommandGroupOptions = {
	/** Name of this command group */
	name: string;

	/** A short description for command-line usage */
	description?: CCliDescription;

	/** If `true`, hide these commands in command-line usage */
	hidden?: boolean;

	/** The {@link ICliCommandGroup`]]s and/or [[`ICliCommand}s in this group */
	subcommands: CCliSubcommand[];
};

export class CCliCommandGroup {
	protected constructor(private readonly options: CCliCommandGroupOptions) {}

	public get name(): string {
		return this.options.name;
	}

	public get description(): CCliDescription {
		return this.options.description;
	}

	public get hidden(): boolean {
		return this.options.hidden || false;
	}

	public get subcommands(): CCliSubcommand[] {
		return this.options.subcommands;
	}

	public static create(options: CCliCommandGroupOptions): CCliCommandGroup {
		return new CCliCommandGroup(options);
	}
}
