import { CliNode } from './cli-node';
import { CLI_COMMAND } from './cli-command';
import { ICliBranch, CLI_BRANCH } from './cli-branch';
import { TwoColumnTableRow } from './two-column-table';

/** [command path, description] */

export function UsageSubcommandRows(branch: ICliBranch): TwoColumnTableRow[] {
  return RecursiveUsageSubcommandRows(branch, '');
}

function RecursiveUsageSubcommandRows(
  current: CliNode['current'],
  subcommandPath: string,
): TwoColumnTableRow[] {
  if (current.hidden && subcommandPath.length > 0) {
    // ^^ conditional on path.length > 0 because we don't want to hide the usage for the
    // current node, e.g. if a user does `cli hidden-branch` it should still show the
    // leaves underneath "hidden-branch".
    return [];
  }

  if (current.kind === CLI_COMMAND) {
    return [[subcommandPath, current.description]];
  }

  if (current.kind === CLI_BRANCH) {
    const subcommandsForUsage: TwoColumnTableRow[] = [];
    for (const child of current.children) {
      subcommandsForUsage.push(
        ...RecursiveUsageSubcommandRows(
          child,
          subcommandPath ? `${subcommandPath} ${child.name}` : child.name,
        ),
      );
    }
    return subcommandsForUsage;
  }

  throw new Error('Unexpected kind');
}
