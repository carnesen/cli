#!/usr/bin/env node
import { runCliAndExit } from '@carnesen/cli';
import { carnesenCliExamples } from '.';

if (module === require.main) {
	runCliAndExit(carnesenCliExamples);
}
