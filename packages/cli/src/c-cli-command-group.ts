import { CCliCommand } from './c-cli-command';
import { CCliDescription } from './c-cli-description';

/** Type of {@link CCliCommandGroupOptions.subcommands} */
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

/** A group of related command-line interface (CLI) commands
 *
 * A **@carnesen/cli** CLI organizes the commands as a tree where commands are
 * the leaves and command groups are the branches. A CLI might not have any
 * groups i.e. the root of the command tree is a command.
 * [`curl`](https://curl.se/docs/manpage.html) is an example of a CLI with a
 * bunch of options but just the one command.
 * [`npm`](https://docs.npmjs.com/cli/v8/commands) is an example of a CLI with
 * many subcommands (e.g. `npm install`) and even sub-subcommands (e.g. `npm
 * config set`). In the parlance of **@carnesen/cli**, the root of the `npm` CLI
 * is a command group. So is its `config` subcommand whereas `install` and `set`
 * are commands */
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

	/** Factory for {@link CCliCommandGroup}s */
	public static create(options: CCliCommandGroupOptions): CCliCommandGroup {
		return new CCliCommandGroup(options);
	}
}
