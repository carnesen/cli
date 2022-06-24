import { CCliDescriptionFunction } from './c-cli-description';

export const CCliWordMark: CCliDescriptionFunction = ({ color }) =>
	color.bold('@carnesen/cli');
