import { CliApi } from './cli-api';
import { TCliRoot } from './cli-tree';
import { ICli, ICliOptions } from './cli-options';
import { CliRun } from './cli-run';
import { CliRunLine } from './cli-run-line';

/**
 * A factory for [[`ICli`]]s
 *
 * @param root The root of this command-line interface's command tree
 * @param options Optional properties and callbacks
 * @returns A command-line interface object
 * */

/** Options for [[`Cli`]] */ export function Cli(
	root: TCliRoot,
	options: ICliOptions = {},
): ICli {
	const api = CliApi(root, options);
	const run = CliRun(api, options);
	const runLine = CliRunLine(run, options);

	return {
		api,
		run,
		runLine,
	};
}
