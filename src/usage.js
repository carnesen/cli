'use strict'
const {isDefined, print2} = require('@carnesen/util')
const {FIELD_TYPES, USAGE_EXIT_STATUS} = require('./constants')

const OPTIONS_STRING = '[options]'
const SUBCOMMAND_STRING = '<subcommand>'

function createVersionString ({name, fieldType, description, defaultValue}) {
  const valuePlaceholder = fieldType === FIELD_TYPES.BOOLEAN ? '' : '<value> '
  const defaultValueString = isDefined(defaultValue) ? `(default: ${defaultValue})` : ''
  return `--${name} ${valuePlaceholder}: ${description} ${defaultValueString}`
}

function indent (strings) {
  return strings.map(string => `   ${string}`).join('\n')
}

function getName ({name}) {
  return name
}

function getOptions (commandStack) {
  const options = []
  commandStack.forEach(function (command) {
    if (command.options) {
      options.push(...command.options)
    }
  })
  return options
}

module.exports = function usage (commandStack, badCommandMessage = 'Bad command') {
  const command = commandStack.slice(-1)[0]
  const {subcommands = [], description = 'A command'} = command

  const paragraphs = []
  function push (text) {
    paragraphs.push(text)
  }

  if (badCommandMessage) {
    push(`Error: ${badCommandMessage}`)
  }

  push(`Usage: ${commandStack.map(getName).join(' ')} ${OPTIONS_STRING} ${subcommands.length > 0 ? SUBCOMMAND_STRING : ''}`)

  push(description)

  const options = getOptions(commandStack)
  if (options.length > 0) {
    push(`Where ${OPTIONS_STRING} include`)
    push(indent(options.map(createVersionString)))
  }

  if (subcommands.length > 0) {
    push(`${options.length > 0 ? 'and' : 'Where'} ${SUBCOMMAND_STRING} is one of`)
    push(indent(subcommands.map(getName)))
  }

  const text = `\n${paragraphs.join('\n\n')}\n`
  print2(text)
  process.exit(USAGE_EXIT_STATUS)
}
