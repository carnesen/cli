#!/usr/bin/env node
import { runCliAndExit, Cli } from '@carnesen/cli';
import { examples } from '.';

const cli = Cli(examples);

if (module === require.main) {
	runCliAndExit(cli);
}
