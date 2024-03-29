import { c, CCliCommand } from '@carnesen/cli';
import { CommandHistory } from './command-history';

export const HISTORY_COMMAND_NAME = 'history';

export function HistoryCommand(
	commandHistory: CommandHistory,
): CCliCommand<any, any, any> {
	const history = c.command({
		name: HISTORY_COMMAND_NAME,
		description: "List the commands in this terminal's history file",
		action() {
			return commandHistory
				.list()
				.map((line, index) => `${index} ${line}`)
				.join('\n');
		},
	});
	return history;
}
