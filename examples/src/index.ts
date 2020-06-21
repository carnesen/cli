import { CliBranch } from '@carnesen/cli';
import { echo } from './echo';
import { multiply } from './multiply';
import { throwError } from './throw-error';
import { advanced } from './advanced';

export const root = CliBranch({
	name: 'examples',
	description: `
	Examples that demonstrate @carnesen/cli features
	`,
	subcommands: [echo, multiply, throwError, advanced],
});
