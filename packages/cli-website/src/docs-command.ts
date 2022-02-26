import { CliCommand } from '@carnesen/cli';
const DOCS_URL = 'https://cli.carnesen.com/docs';
export const docsCommand = CliCommand({
	name: 'docs',
	description: `Open ${DOCS_URL} in a new tab`,
	action() {
		window.open(DOCS_URL, '_blank');
		return `Opened ${DOCS_URL} in a new tab`;
	},
});
