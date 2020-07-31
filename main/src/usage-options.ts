import { ICliAnsi } from './cli-ansi';

export interface IUsageOptions {
	ansi: ICliAnsi;
	columns: number;
	indentation: string;
}
