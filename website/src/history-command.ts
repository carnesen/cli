import { CliCommand, ICliCommand } from '@carnesen/cli';
import { CommandHistory } from './command-history';

export function HistoryCommand(
	commandHistory: CommandHistory,
): ICliCommand<any, any, any> {
	const history = CliCommand({
		name: 'history',
		description: "List the commands in this terminal's history file",
		action: () => {
			return commandHistory
				.list()
				.map((line, index) => `${index} ${line}`)
				.join('\n');
		},
	});
	return history;
}
