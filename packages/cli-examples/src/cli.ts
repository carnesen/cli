#!/usr/bin/env node
// ^^ This "shebang" line [https://en.wikipedia.org/wiki/Shebang_(Unix)] is
//  mandatory for this file to be an proper cross-platform npm executable.
//
// See also https://docs.npmjs.com/files/package.json#bin

/**
 * The @carnesen/cli-examples Node.js executable CLI
 */

import { c } from '@carnesen/cli';
import { rootCommandGroup } from './index';

const cli = c.cli(rootCommandGroup);

// The idiomatic Node.js expression `module === require.main` determines whether
// this module is the one being run directly as `node <module file>` or if this
// module is just being `require`d by another module.
if (module === require.main) {
	cli.run();
}
