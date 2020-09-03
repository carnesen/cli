#!/usr/bin/env node
/**
 * This script prints to stdout the package.json contents for the
 * @carnesen/cli-docs package.
 */
const cliPkg = require('../package.json');

const {
	name,
	version,
	publishConfig,
	keywords,
	author,
	repository,
	bugs,
	homepage,
	license,
} = cliPkg;

const docsPkg = {
	name: `${name}-docs`,
	description: `Documentation for ${name}`,
	version,
	publishConfig,
	keywords,
	author,
	repository,
	bugs,
	homepage: `${homepage}/docs`,
	license,
};

// eslint-disable-next-line no-console
console.log(JSON.stringify(docsPkg, null, '\t'));
