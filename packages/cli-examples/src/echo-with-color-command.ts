import {
	c,
	CCliFlagArgGroup,
	CCliDescriptionFunctionInput,
	CCliTerseError,
} from '@carnesen/cli';

// This command uses
// [https://en.wikipedia.org/wiki/Metaprogramming](metaprogramming) to build up
// the CLI's named arguments --blue --red etc.

const COLOR_METHOD_NAMES = ['bold', 'blue', 'green', 'red'] as const;
type ColorMethodName = typeof COLOR_METHOD_NAMES[number];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NAMED_ARG_GROUPS_AS_ANY: any = {};

for (const methodName of COLOR_METHOD_NAMES) {
	NAMED_ARG_GROUPS_AS_ANY[methodName] = c.flag({
		description({ color }) {
			return `Decorate the text ${color[methodName](methodName)}`;
		},
	});
}

const NAMED_ARG_GROUPS: {
	[K in ColorMethodName]: CCliFlagArgGroup;
} = NAMED_ARG_GROUPS_AS_ANY;

/**
 * Print to the terminal like `echo` optionally with ANSI text decoration
 */
export const echoWithColorCommand = c.command({
	name: 'echo-with-color',
	description(input) {
		return `Print to the terminal with ${colorWordMarkFactory(input)}`;
	},
	positionalArgGroup: c.stringArray({
		required: true,
	}),
	namedArgGroups: NAMED_ARG_GROUPS,
	action({ positionalValue: messages, namedValues, color }) {
		// In addition to the parsed argument values, the action also receives a
		// `ansi` object for decorating text sent to the terminal. By default, the
		// `ansi` methods will wrap the provided text in ANSI escape codes
		// https://en.wikipedia.org/wiki/ANSI_escape_code when the terminal
		// is fully interactive (both stdout and stderr are a TTY).
		let text = messages.join(' ');
		const namedValueEntries: [ColorMethodName, boolean][] =
			COLOR_METHOD_NAMES.map((methodName) => [
				methodName,
				namedValues[methodName],
			]);
		const methodNames = namedValueEntries
			.filter(([_name, value]) => value)
			.map(([name]) => name);
		if (methodNames.length > 1) {
			throw new CCliTerseError(
				`Flags --${methodNames[0]} and --${methodNames[1]} are mutually exclusive`,
			);
		}
		if (methodNames.length === 1) {
			text = color[methodNames[0]](text);
		}
		return text;
	},
});

export function colorWordMarkFactory({
	color,
}: CCliDescriptionFunctionInput): string {
	return `${color.bold('c')}${color.green('o')}${color.blue('l')}${color.red(
		'o',
	)}r`;
}
