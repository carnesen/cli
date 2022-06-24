import { cCliProcessFactory } from './c-cli-process';
import { CCliColor } from './c-cli-color';
import { CCliAnsiColor } from './c-cli-ansi-color';
import { CCliNoopColor } from './c-cli-noop-color';

/** A factory for {@link CCliColor}s
 * @param ansi If `true`, return a `CCliAnsiColor` instance. If `false`, return a
 * `CCliNoopColor` instance. If `undefined`, return a `CliAnsiColor` instance if
 * stdout and stderr are both a TTY or a `CliNoopColor` instance otherwise. */
export function cCliColorFactory(ansi?: boolean): CCliColor {
	switch (ansi) {
		case true: {
			return CCliAnsiColor.create();
		}
		case false: {
			return CCliNoopColor.create();
		}
		case undefined:
		default: {
			const { stderr, stdout } = cCliProcessFactory();
			return stdout.isTTY && stderr.isTTY
				? CCliAnsiColor.create()
				: CCliNoopColor.create();
		}
	}
}
