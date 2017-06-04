#!/usr/bin/env node

const {print} = require('@carnesen/util')

const {TYPES, runCommand} = require('../index')

const PARAMETER = {
  name: 'message',
  description: 'the message',
  type: TYPES.string,
}

const _print = {
  name: 'print',
  execute ({message}) {
    print(message)
  },
  description: 'Prints the provided message to stdout',
  parameters: [PARAMETER],
}

const fail = {
  name: 'fail',
  description: 'Throws the provided message',
  execute ({message}) {
    throw new Error(message)
  },
  parameters: [PARAMETER],
}

const command = {
  name: 'test-cli',
  description: 'A test cli',
  subcommands: [_print, fail],
}

if (require.main === module) {
  runCommand(command, process.argv.slice(2))
}

module.exports = command
