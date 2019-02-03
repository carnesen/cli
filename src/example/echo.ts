import { option, leaf } from '..';

import { messageOptions } from './message-options';
import { cli } from '../factories';

export const echo = leaf({
  commandName: 'echo',
  description: 'Print a message to the console',
  options: {
    ...messageOptions,
    appendBar: option({
      description: 'Append "foo" to the message',
      typeName: 'boolean',
      nullable: false,
    }),
  },
  action({ message, appendBar }) {
    return appendBar ? `${message}bar` : message;
  },
});

export const echoFooOrBarCommand = leaf({
  commandName: 'echoFooOrBar',
  options: {
    fooOrBar: option({
      typeName: 'string',
      nullable: false,
      allowedValues: ['foo', 'bar'],
    }),
  },
  action({ fooOrBar }) {
    return fooOrBar;
  },
});

export const echoWordsCommand = leaf({
  commandName: 'echoWords',
  options: {
    words: option({
      typeName: 'string[]',
      nullable: false,
      defaultValue: ['foo', 'bar', 'baz'],
    }),
  },
  action({ words }) {
    return words.join(' ');
  },
});

if (module === require.main) {
  cli(echo)();
}
