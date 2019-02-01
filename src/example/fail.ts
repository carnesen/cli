import { option, leaf, cli } from '..';

import { messageOptions } from './message-options';

export const fail = leaf({
  commandName: 'fail',
  description: 'Throw a message to the console',
  options: {
    ...messageOptions,
    includeStack: option({
      typeName: 'boolean',
      nullable: false,
      description: 'Include a stack trace',
      defaultValue: false,
    }),
  },
  action({ message, includeStack }) {
    if (includeStack) {
      throw new Error(message);
    }
    throw message;
  },
});

if (module === require.main) {
  cli(fail)();
}
