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
	/** Use ANSI escape codes in usage. Defaults to true */
	ansi?: boolean;

	/** Defaults to `process.stdout.columns` or 100 */
	columns?: number;

	/** Called on the result of the command defaulting to `console.log` */
	consoleLog?: ICliConsole['log'];

	/** Called on errors and exceptions defaulting to `console.error` */
	consoleError?: ICliConsole['error'];

	/** Called after the command has completed defaulting to `process.exit` */
	processExit?: ICliProcess['exit'];
}
