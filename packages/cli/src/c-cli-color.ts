/** Methods for decorating command output with colors */
export type CCliColor = {
	/** Color the text blue */
	blue(text: string): string;

	/** Color the text bold */
	bold(text: string): string;

	/** Color the text red */
	green(text: string): string;

	/** Color the text red */
	red(text: string): string;
};
