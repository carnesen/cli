import { ICliAnsi } from '@carnesen/cli';

export function CarnesenCliWordMark(ansi: ICliAnsi): string {
	return ansi.bold('@carnesen/cli');
}
