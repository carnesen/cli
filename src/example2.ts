import { cli } from '.';
import { getFoo as rootCommand } from './example';

// This is an example of a leaf as the root command
if (module === require.main) {
  cli(rootCommand)();
}
