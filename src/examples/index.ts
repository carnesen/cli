import { runCliAndExit, CliBranch } from '..';
import { echoCliCommand } from './echo';
import { multiplyCliCommand as readme } from './readme';
import { root as throw_ } from './throw';

const pkg = require('../../package.json');

export const examples = CliBranch({
  name: 'examples',
  description: `Examples that demonstrate ${pkg.name} features`,
  subcommands: [echoCliCommand, readme, throw_],
});

if (module === require.main) {
  runCliAndExit(examples);
}
