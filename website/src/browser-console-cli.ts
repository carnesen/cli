import { Cli } from '@carnesen/cli';

import { rootBranch } from './root-branch';

// Define `cli` in the browser's global JavaScript context
(window as any).cli = Cli(rootBranch).runLine;
