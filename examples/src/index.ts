import { runCliAndExit, CliBranch } from '@carnesen/cli';
import { echo } from './echo';
import { multiply } from './multiply';
import { throwSpecialError } from './throw-special-error';

export const examples = CliBranch({
	name: 'examples',
	description: `Examples that demonstrate @carnesen/cli features`,
	subcommands: [echo, multiply, throwSpecialError],
});

if (module === require.main) {
	runCliAndExit(examples);
}
