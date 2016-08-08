'use strict';

// command = {
//   name: 'asdf'
//   execute || commands:
//   parameters: {
//
//   positional: [
//     {
//       name: 'foo',
//       type: 'string',
//       required: true
//     },
//     {
//       name: 'bar',
//       type: 'integer',
//     }
//   ]
//
//   named: [
//
//   ]
//
// }

const util = require('@carnesen/util');

module.exports = function validateCommand({ name, execute, commands, parameters }) {

  util.throwIfNotString(name, 'name');

  if (execute && commands) {
    throw new Error('Expected property "execute" or "commands" but not both');
  }

  if (execute) {

  }

};
