/** Implements the {@link CCliColor} interface with no-op methods that just return
 * the text provided */
export class CCliNoopColor {
	protected constructor() {}

	public blue(text: string): string {
		return text;
	}

	public bold(text: string): string {
		return text;
	}

	public green(text: string): string {
		return text;
	}

	public red(text: string): string {
		return text;
	}

	/** Factory for creating `CCliNoopColor` instances */
	public static create(): CCliNoopColor {
		return new CCliNoopColor();
	}
}
