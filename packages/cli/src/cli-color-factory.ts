import { cliProcessFactory } from './cli-process';
import { CliColor } from './cli-color';
import { CliAnsiColor } from './cli-ansi-color';
import { CliNoopColor } from './cli-noop-color';

/** A factory for [[`CliColor`]]s
 * @param ansi If `true`, return a `CliAnsiColor` instance. If `false`, return a
 * `CliNoopColor` instance. If `undefined`, return a `CliAnsiColor` instance if
 * stdout and stderr are both a TTY or a `CliNoopColor` instance otherwise. */
export function cliColorFactory(ansi?: boolean): CliColor {
	switch (ansi) {
		case true: {
			return CliAnsiColor.create();
		}
		case false: {
			return CliNoopColor.create();
		}
		default: {
			const { stderr, stdout } = cliProcessFactory();
			return stdout.isTTY && stderr.isTTY
				? CliAnsiColor.create()
				: CliNoopColor.create();
		}
	}
}
