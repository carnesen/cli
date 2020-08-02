#!/usr/bin/env node

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

console.log(JSON.stringify(docsPkg, null, '\t'));
