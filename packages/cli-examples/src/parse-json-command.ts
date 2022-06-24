import { c } from '@carnesen/cli';

/**
 * A command for parsing JSON
 */
export const parseJsonCommand = c.command({
	name: 'parse-json',
	description: `
		Parse JSON and print the result

		This command demonstrates how to allow your users to input complex data into 
		your CLI using JSON and how to pretty-print an arbitrary result object.
		Since a JSON string has spaces and double quotes in it, you'll need
		to wrap the JSON argument in single quotes to tell the shell to
		treat that part of the command line as a single argument.

		Example: parse '{"foo": "bar"}'

		To accept JSON data into your CLI, use the CliJsonArgGroup factory
		[https://cli.carnesen.com/docs/latest/globals.html#clijsonarggroup]. This
		arg group automatically parses the JSON and passes it into your command
		action as type "any" since JSON can represent arbitrary data.
		
		To pretty-print an object simply return the object and let cli.run
		take care of the rest. Behind the scenes, we use Node.js' util.inspect 
		[https://nodejs.org/api/util.html#util_util_inspect_object_options]
		(or a browser replacement [https://www.npmjs.com/package/util-inspect]) 
		to serialize your JavaScript object into a beautiful string representation
		with ANSI colors and highlighting suitable for writing to a terminal.
		`,
	positionalArgGroup: c.json(),
	action({ positionalValue: parsed }) {
		return parsed;
	},
});
