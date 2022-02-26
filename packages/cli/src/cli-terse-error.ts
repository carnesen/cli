/** "code" of a [[`CliTerseError`]] */
export const CLI_TERSE_ERROR = 'CLI_TERSE_ERROR';

/**
 * Thrown to print an error message but not a `stack`
 */
export class CliTerseError extends Error {
	/** The string constant [[`CLI_TERSE_ERROR`]] */
	public readonly code: typeof CLI_TERSE_ERROR;

	/** Numeric code with which to return/exit */
	public readonly exitCode: number;

	constructor(message: string, exitCode = 1) {
		super(message);
		this.code = CLI_TERSE_ERROR;
		this.exitCode = exitCode;
		Object.setPrototypeOf(this, new.target.prototype);
	}
}
