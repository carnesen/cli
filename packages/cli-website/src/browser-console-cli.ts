import { Cli } from '@carnesen/cli';

import { rootCommandGroup } from './root-command-group';

// Define `cli` in the browser's global JavaScript context
(window as any).cli = Cli(rootCommandGroup).runLine;
