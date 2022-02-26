import {
	CliCommand,
	CliStringArrayArgGroup,
	CliAnsi,
	ICliAnsi,
	ICliArgGroup,
	CliFlagArgGroup,
	CliTerseError,
} from '@carnesen/cli';

// This command uses
// [https://en.wikipedia.org/wiki/Metaprogramming](metaprogramming) to build up
// the CLI's named arguments --blue --red etc. based on the method names of a
// CliAnsi object.

type AnsiMethodName = Exclude<keyof ICliAnsi, 'enabled'>;
const ANSI_METHOD_NAMES = Object.keys(CliAnsi()).filter(
	(propertyName) => propertyName !== 'enabled',
) as AnsiMethodName[];

const NAMED_ARG_GROUPS_AS_ANY: any = {};

for (const methodName of ANSI_METHOD_NAMES) {
	NAMED_ARG_GROUPS_AS_ANY[methodName] = CliFlagArgGroup({
		description({ ansi }) {
			return `Decorate the text ${ansi[methodName](methodName)}`;
		},
	});
}

const NAMED_ARG_GROUPS: {
	[K in AnsiMethodName]: ICliArgGroup<boolean, false>;
} = NAMED_ARG_GROUPS_AS_ANY;

/**
 * Print to the terminal like `echo` optionally with ANSI text decoration
 */
export const ansiEchoCommand = CliCommand({
	name: 'ansi-echo',
	description({ ansi }) {
		return `Print to the terminal with ${AnsiWordMark(ansi)} decoration`;
	},
	positionalArgGroup: CliStringArrayArgGroup({
		required: true,
	}),
	namedArgGroups: NAMED_ARG_GROUPS,
	action({ positionalValue: messages, namedValues, ansi }) {
		// In addition to the parsed argument values, the action also receives a
		// `ansi` object for decorating text sent to the terminal. By default, the
		// `ansi` methods will wrap the provided text in ANSI escape codes
		// https://en.wikipedia.org/wiki/ANSI_escape_code when the terminal
		// is fully interactive (both stdout and stderr are a TTY).
		let text = messages.join(' ');
		const namedValueEntries: [
			AnsiMethodName,
			boolean,
		][] = ANSI_METHOD_NAMES.map((methodName) => [
			methodName,
			namedValues[methodName],
		]);
		const methodNames = namedValueEntries
			.filter(([_name, value]) => value)
			.map(([name]) => name);
		if (methodNames.length > 1) {
			throw new CliTerseError(
				`Flags --${methodNames[0]} and --${methodNames[1]} are mutually exclusive`,
			);
		}
		if (methodNames.length === 1) {
			text = ansi[methodNames[0]](text);
		}
		return text;
	},
});

export function AnsiWordMark(ansi: ICliAnsi): string {
	return `${ansi.bold('A')}${ansi.green('N')}${ansi.blue('S')}${ansi.red('I')}`;
}
