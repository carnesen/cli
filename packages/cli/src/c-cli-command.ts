import { ValueFromCCliArgGroup, CCliArgGroup } from './c-cli-arg-group';
import { CCliLogger } from './c-cli-logger';
import { CCliColor } from './c-cli-color';
import { AnyCliDescription } from './c-cli-description';

/** Options for creating a **@carnesen/cli** command */
export type CCliCommandOptions<
	PositionalArgGroup extends CCliArgGroup = CCliArgGroup,
	NamedArgGroups extends {
		[name: string]: CCliArgGroup;
	} = {
		[name: string]: CCliArgGroup;
	},
	DoubleDashArgGroup extends CCliArgGroup = CCliArgGroup,
> = {
	/** Identifier for this command in command-line usage */
	name: string;

	/** Function or async function that implements the command */
	action: (input: {
		/** @deprecated Use `color` instead */
		ansi: CCliColor;
		color: CCliColor;
		/** @deprecated Use `logger` instead */
		console: CCliLogger;
		doubleDashValue: ValueFromCCliArgGroup<DoubleDashArgGroup>;
		logger: CCliLogger;
		namedValues: {
			[K in keyof NamedArgGroups]: ValueFromCCliArgGroup<NamedArgGroups[K]>;
		};
		positionalValue: ValueFromCCliArgGroup<PositionalArgGroup>;
	}) => any;

	/** A {@link CliArgGroup} for the arguments before the first separator argument */
	positionalArgGroup?: PositionalArgGroup;

	/** A {@link CliArgGroup} for the arguments passed as "--name value" */
	namedArgGroups?: NamedArgGroups;

	/** A {@link CliArgGroup} for the arguments after a lone "--" */
	doubleDashArgGroup?: DoubleDashArgGroup;

	/** A sentence or two about this command for command-line usage */
	description?: AnyCliDescription;

	/** If `true`, don't show this command in command-line usage */
	hidden?: boolean;
};

/** A **@carnesen/cli** command-line interface (CLI) command */
export class CCliCommand<
	PositionalArgGroup_ extends CCliArgGroup = CCliArgGroup,
	NamedArgGroups_ extends {
		[name: string]: CCliArgGroup;
	} = {
		[name: string]: CCliArgGroup;
	},
	DoubleDashArgGroup_ extends CCliArgGroup = CCliArgGroup,
> {
	protected constructor(
		public readonly options: CCliCommandOptions<
			PositionalArgGroup_,
			NamedArgGroups_,
			DoubleDashArgGroup_
		>,
	) {}

	/** Factory for **@carnesen/cli** command-line interface (CLI) commands */
	public static create<
		PositionalArgGroup extends CCliArgGroup = CCliArgGroup<unknown, false>,
		NamedArgGroups extends {
			[name: string]: CCliArgGroup;
		} = {
			[name: string]: CCliArgGroup;
		},
		DoubleDashArgGroup extends CCliArgGroup = CCliArgGroup<unknown, false>,
	>(
		options: CCliCommandOptions<
			PositionalArgGroup,
			NamedArgGroups,
			DoubleDashArgGroup
		>,
	): CCliCommand<PositionalArgGroup, NamedArgGroups, DoubleDashArgGroup> {
		return new CCliCommand<
			PositionalArgGroup,
			NamedArgGroups,
			DoubleDashArgGroup
		>(options);
	}
}
