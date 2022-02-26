import { CliCommand } from '@carnesen/cli';
const DOCS_URL = 'https://cli.carnesen.com/docs';
export const docsCommand = CliCommand({
	name: 'docs',
	description: `Go to the docs page ${DOCS_URL}`,
	action() {
		window.location.assign(DOCS_URL);
		return `Navigating to ${DOCS_URL}`;
	},
});
