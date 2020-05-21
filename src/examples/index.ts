import { runCliAndExit, CliBranch } from '..';
import { echoCliLeaf } from './echo';
import { multiplyCliLeaf as readme } from './readme';
import { root as throw_ } from './throw';

const pkg = require('../../package.json');

export const examples = CliBranch({
  name: 'examples',
  description: `Examples that demonstrate ${pkg.name} features`,
  subcommands: [echoCliLeaf, readme, throw_],
});

if (module === require.main) {
  runCliAndExit(examples);
}
