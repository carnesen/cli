/** Thrown to print an error message but not a `stack` */
export class CCliTerseError extends Error {
	public constructor(message: string, public readonly exitCode = 1) {
		super(message);
	}
}
