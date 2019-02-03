import { cli, branch } from '..';
import { absoluteCat } from './absolute-cat';
import { echoFooOrBarCommand, echoWordsCommand, echo } from './echo';
import { invalidTypeName } from './invalid-type-name';
import { getFoo } from './get-foo';
import { cat } from './cat';
import { math } from './math';
import { concat } from './concat';
import { nullable } from './nullable';
import { fail } from './fail';

const pkg = require('../../package.json');

export const root = branch({
  commandName: 'example-cli',
  version: pkg.version,
  description: `
    This is an example command-line interface (CLI).
    Its only purpose is to demonstrate features.
    This is an example of a multi-line command description.`,
  subcommands: [
    absoluteCat,
    echoFooOrBarCommand,
    echoWordsCommand,
    invalidTypeName,
    getFoo,
    cat,
    math,
    concat,
    echo,
    fail,
    nullable,
  ],
});

if (module === require.main) {
  cli(root)();
}
