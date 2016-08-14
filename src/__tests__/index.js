'use strict';

const cli = require('../..');

const succeed = {
  name: 'succeed',
  execute: Promise.resolve.bind(Promise),
  description: 'succeeds',
  parameters: [
    {
      name: 'positional-message',
      description: 'the positional message',
      type: 'string',
      positional: true
    },
    {
      name: 'message',
      description: 'the message',
      type: 'string'
    }
  ]
};

const fail = {
  name: 'fail',
  execute: Promise.reject.bind(Promise),
  description: 'fails',
  parameters: [
    {
      name: 'positional-message',
      description: 'the positional message',
      type: 'string',
      positional: true
    },
    {
      name: 'message',
      description: 'the message',
      type: 'string'
    }
  ]
};

const commands = [
  succeed,
  fail
];

cli({
  name: 'test-cli',
  commands,
  description: 'A test cli'
});
