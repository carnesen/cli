import { CliDescriptionFunction } from './cli-description';

export const CliWordMark: CliDescriptionFunction = ({ color }) =>
	color.bold('@carnesen/cli');
