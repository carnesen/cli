#!/usr/bin/env node
import { runCliAndExit, Cli } from '@carnesen/cli';
import { root } from '.';

const cli = Cli(root);

if (module === require.main) {
	runCliAndExit(cli);
}
