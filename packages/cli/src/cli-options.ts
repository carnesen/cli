import { CliColor } from './cli-color';
import { CliLogger } from './cli-logger';
import { CliProcess } from './cli-process';

/** A command-line interface (CLI) created by [[`Cli`]] */
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

/** Options for [[`Cli`]] */
export type CliOptions = {
	/** Enable/disable ANSI text decoration
	 * @default process.stdout.isTTY && process.stderr.isTTY */
	ansi?: boolean;

	/** Text coloring methods. Takes precedence over the `ansi` option
	 * @default CliDefaultColor */
	color?: CliColor;

	/** Number of terminal columns
	 * @default process.stdout.columns || 100 */
	columns?: number;

	/** @deprecated Use `logger` instead */
	console?: CliLogger;

	/** Called after the command has completed. Defaults to `process.exit` */
	done?: CliProcess['exit'];

	/** `CliLogger` object to use for the CLI. Defaults to the global `console`
	 * object. The CLI runner calls `logger.log` on the command's `action` return
	 * value if there is one. The CLI runner calls `logger.error` on the
	 * exception if one is thrown. The `logger` is injected into the command
	 * `action` too. */
	logger?: CliLogger;
};
