import { ICliConsole } from './cli-console';
import { ICliProcess } from './cli-process';

/**
 * A command-line interface (CLI) created by [[`Cli`]]
 */
export interface ICli {
	/**
	 * Programmatic interface for the CLI, useful for unit testing
	 * @param args Command-line argument strings
	 * @returns A promise resolving to the command action's return value
	 */
	api(args: string[]): Promise<any>;

	/**
	 * Run the command-line interface, console.log the result, and exit
	 * @param args Command line arguments parsed and passed into the command
	 * action. Defaults to `process.argv.slice(2)` in Node.js.
	 * @returns A promise resolving to the command's exit code
	 * */
	run(args?: string[]): Promise<number>;

	/**
	 * Split a command line into args and call [[`ICli.run`]]
	 * @param line A command line
	 * @returns A promise resolving to the command's exit code
	 * */
	runLine(line?: string): Promise<number>;
}

/**
 * Options for [[`Cli`]]
 * */
export interface ICliOptions {
	/**
	 * Enable/disable ANSI text decoration. Defaults to `process.stdout.isTTY &&
	 * process.stderr.isTTY`
	 * */
	ansi?: boolean;

	/**
	 * Number of terminal columns. Defaults to `process.stdout.columns || 100`
	 * */
	columns?: number;

	/** `console.log` is called on the result, `console.error` on error */
	console?: ICliConsole;

	/** Called after the command has completed. Defaults to `process.exit` */
	done?: ICliProcess['exit'];
}
