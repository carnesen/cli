import { CliDescriptionFunction } from './cli-description';

export const CliWordMark: CliDescriptionFunction = ({ ansi }) =>
	ansi.bold('@carnesen/cli');
