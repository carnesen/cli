export class CliNoopColor {
	protected constructor() {}

	public blue(message: string): string {
		return message;
	}

	public bold(message: string): string {
		return message;
	}

	public green(message: string): string {
		return message;
	}

	public red(message: string): string {
		return message;
	}

	public static create(): CliNoopColor {
		return new CliNoopColor();
	}
}
