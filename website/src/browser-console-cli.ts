import { Cli, ICliOptions, CliNoAnsi } from '@carnesen/cli';

import { rootBranch } from './root-branch';

const options: ICliOptions = {
	ansi: CliNoAnsi(),
};

// Define `cli` in the browser's global JavaScript context
(window as any).cli = Cli(rootBranch, options).runLine;
