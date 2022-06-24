import {
	InferParsedValueFromCCliArgGroup,
	CCliArgGroup,
} from './c-cli-arg-group';
import { CCliLogger } from './c-cli-logger';
import { CCliColor } from './c-cli-color';
import { CCliDescription } from './c-cli-description';

/** Type of the `input` argument injected into injected into
 * {@link CCliCommandOptions.action} */
export type CCliCommandActionInput<
	PositionalArgGroup extends CCliArgGroup,
	NamedArgGroups extends {
		[name: string]: CCliArgGroup;
	},
	DoubleDashArgGroup extends CCliArgGroup,
> = {
	color: CCliColor;
	doubleDashValue: InferParsedValueFromCCliArgGroup<DoubleDashArgGroup>;
	logger: CCliLogger;
	namedValues: {
		[K in keyof NamedArgGroups]: InferParsedValueFromCCliArgGroup<
			NamedArgGroups[K]
		>;
	};
	positionalValue: InferParsedValueFromCCliArgGroup<PositionalArgGroup>;
};

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
	// Mandatory options

	/** Function or async function that implements the command */
	action: (
		input: CCliCommandActionInput<
			PositionalArgGroup,
			NamedArgGroups,
			DoubleDashArgGroup
		>,
	) => any;

	/** Identifier for this command in command-line usage */
	name: string;

	// Optional options

	/** A sentence or two about this command for command-line usage or a function
	 * returning the description text */
	description?: CCliDescription;

	/** A {@link CCliArgGroup} for the arguments after a lone "--" */
	doubleDashArgGroup?: DoubleDashArgGroup;

	/** If `true`, don't show this command in command-line usage */
	hidden?: boolean;

	/** A {@link CCliArgGroup} for the arguments passed as "--name value" */
	namedArgGroups?: NamedArgGroups;

	/** A {@link CCliArgGroup} for the arguments before the first separator argument */
	positionalArgGroup?: PositionalArgGroup;
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
		protected readonly options: CCliCommandOptions<
			PositionalArgGroup_,
			NamedArgGroups_,
			DoubleDashArgGroup_
		>,
	) {}

	public action(
		input: CCliCommandActionInput<
			PositionalArgGroup_,
			NamedArgGroups_,
			DoubleDashArgGroup_
		>,
	): any {
		return this.options.action(input);
	}

	public get description(): CCliDescription {
		return this.options.description;
	}

	public get doubleDashArgGroup(): DoubleDashArgGroup_ | undefined {
		return this.options.doubleDashArgGroup;
	}

	public get hidden(): boolean {
		return this.options.hidden ?? false;
	}

	public get name(): string {
		return this.options.name;
	}

	public get namedArgGroups(): NamedArgGroups_ | undefined {
		return this.options.namedArgGroups;
	}

	public get positionalArgGroup(): PositionalArgGroup_ | undefined {
		return this.options.positionalArgGroup;
	}

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
