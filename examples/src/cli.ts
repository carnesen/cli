#!/usr/bin/env node
// ^^ This "shebang" line [https://en.wikipedia.org/wiki/Shebang_(Unix)] is
//  mandatory for this file to be an npm executable. Note that the shebang line
//  references "node" not "ts-node"!
//
// Reference: https://docs.npmjs.com/files/package.json#bin

/**
 * The @carnesen/cli-examples Node.js executable CLI
 */

import { runCliAndExit, Cli } from '@carnesen/cli';
import { rootBranch } from './index';

const cli = Cli(rootBranch);

// The idiomatic Node.js expression `module === require.main` determines whether
// this module is the one being run directly as `node <module file>` or if this
// module is just being `require`d by another module.
if (module === require.main) {
	runCliAndExit(cli);
}
