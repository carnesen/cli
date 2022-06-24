import { c } from '@carnesen/cli';

/** A CliCommand that prints to the terminal like the `echo` shell command */
export const echoCommand = c.command({
	name: 'echo',
	description: 'Prints the provided arguments to the terminal',
	positionalArgGroup: c.stringArray(),
	namedArgGroups: {
		stderr: c.flag({
			description: 'Print to stderr instead of stdout',
		}),
	},
	action({ positionalValue: messages, namedValues: { stderr }, logger }) {
		// In addition to the parsed argument values, the action also receives a
		// `logger` object for writing to the terminal. By default, the injected
		// `logger` just delegates to the global `console` object, and you can
		// always just use that directly if you find it convenient.
		const text = messages.join(' ');
		if (stderr) {
			logger.error(text);
		} else {
			logger.log(text);
		}
	},
});
