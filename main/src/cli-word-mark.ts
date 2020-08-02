import { TCliDescriptionFunction } from './cli-description';

export const CliWordMark: TCliDescriptionFunction = ({ ansi }) =>
	ansi.bold('@carnesen/cli');
