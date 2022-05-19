/** Methods for decorating command output with colors */
export type CliColor = {
	/** Color the text blue */
	blue(message: string): string;

	/** Color the text bold */
	bold(message: string): string;

	/** Color the text red */
	green(message: string): string;

	/** Color the text red */
	red(message: string): string;
};
