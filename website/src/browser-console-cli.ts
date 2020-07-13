import { Cli, ICliOptions } from '@carnesen/cli';

import { rootCommand } from './root-command';

const options: ICliOptions = {
	colors: false,
};

// Define `cli` in the browser's global JavaScript context
(window as any).cli = Cli(rootCommand, options).runLine;
