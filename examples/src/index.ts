#!/usr/bin/env node
import { runCliAndExit, CliBranch } from '@carnesen/cli';
import { echo } from './echo';
import { multiply } from './multiply';
import { throwSpecialError } from './throw-special-error';

export const carnesenCliExamples = CliBranch({
	name: 'carnesen-cli-examples',
	description: `Examples that demonstrate @carnesen/cli features`,
	children: [echo, multiply, throwSpecialError],
});

if (module === require.main) {
	runCliAndExit(carnesenCliExamples);
}
