/** "code" of a {@link CCliTerseError} */
export const C_CLI_TERSE_ERROR = 'C_CLI_TERSE_ERROR';

/** Thrown to print an error message but not a `stack` */
export class CCliTerseError extends Error {
	/** The string constant {@link C_CLI_TERSE_ERROR} */
	public readonly code: typeof C_CLI_TERSE_ERROR;

	/** Numeric code with which to return/exit */
	public readonly exitCode: number;

	public constructor(message: string, exitCode = 1) {
		super(message);
		this.code = C_CLI_TERSE_ERROR;
		this.exitCode = exitCode;
	}
}
