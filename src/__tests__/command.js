const {print} = require('@carnesen/util')
const {FIELD_TYPES} = require('../constants')

const MESSAGE_OPTION = {
  name: 'message',
  description: 'the message',
  fieldType: FIELD_TYPES.STRING,
}

const _print = {
  name: 'print',
  execute ({message}) {
    print(message)
  },
  description: 'Prints the provided message to stdout',
  options: [MESSAGE_OPTION],
}

const fail = {
  name: 'fail',
  description: 'Throws the provided message',
  execute ({message}) {
    throw new Error(message)
  },
  options: [MESSAGE_OPTION],
}

module.exports = {
  name: 'test-cli',
  description: 'A test cli',
  subcommands: [_print, fail],
}
