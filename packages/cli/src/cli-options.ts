import { CliColor } from './cli-color';
import { CliLogger } from './cli-logger';
import { CliProcess } from './cli-process';

/** Options for creating a `Cli` */
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
