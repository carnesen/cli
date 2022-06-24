import { c } from '@carnesen/cli';

/** A "hidden" CliCommand that otherwise behaves like the normal "echo" command */
export const echoHiddenCommand = c.command({
	name: 'echo-hidden',
	description: `
		Same as echo but with hidden=true

		This command otherwise behaves like "echo" but is has "hidden" set to true. 
		So it doesn't show up in command-line usage documentation unless you
		specifically  navigate to it and do --help, for example i.e. if you already 
		know about it.
	`,
	hidden: true,
	positionalArgGroup: c.stringArray(),
	action({ positionalValue: messages }) {
		return messages.join(' ');
	},
});
