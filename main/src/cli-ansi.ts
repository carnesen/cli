export interface ICliAnsi {
	red(message: string): string;
}

export function CliAnsi(): ICliAnsi {
	return {
		red(message: string): string {
			return `\u001b[31m${message}\u001b[39m`;
		},
	};
}

export function CliNoAnsi(): ICliAnsi {
	return {
		red(message: string): string {
			return message;
		},
	};
}
