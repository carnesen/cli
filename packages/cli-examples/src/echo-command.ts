import {
	CliCommand,
	CliStringArrayArgGroup,
	CliFlagArgGroup,
} from '@carnesen/cli';

/**
 * A CliCommand that prints to the terminal like the `echo` shell command
 */
export const echoCommand = CliCommand({
	name: 'echo',
	description: 'Prints the provided arguments to the terminal',
	positionalArgGroup: CliStringArrayArgGroup({
		required: true,
	}),
	namedArgGroups: {
		stderr: CliFlagArgGroup({
			description: 'Print to stderr instead of stdout',
		}),
	},
	action({
		positionalValue: messages,
		namedValues: { stderr },
		console: logger,
	}) {
		// In addition to the parsed argument values, the action also receives a
		// `console` object for writing to the terminal. By default, the injected
		// `console` just delegates to the global one, and you can always just use
		// that directly if you find it convenient. We prefer to always either
		// return a value, which gets console.logged too, or use the injected
		// `console` because:
		// - Our linter complains if we reference the global `console`
		// - Our commands run in exotic places like the @carnesen/cli online
		//   examples that use a non-default `console`
		const text = messages.join(' ');
		if (stderr) {
			logger.error(text);
		} else {
			logger.log(text);
		}
	},
});
