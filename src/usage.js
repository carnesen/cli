'use strict'

const chalk = require('chalk')
const {isDefined, print2} = require('@carnesen/util')
const {EXIT_STATUSES, TYPES} = require('./constants')

const PARAMETERS_STRING = '<parameters>'
const SUBCOMMAND_STRING = '<subcommand>'

function createVersionString ({name, fieldType, description, defaultValue}) {
  const valuePlaceholder = fieldType === TYPES.boolean ? '' : '<value> '
  const defaultValueString = isDefined(defaultValue) ? `(default: ${defaultValue})` : ''
  return `--${name} ${valuePlaceholder}: ${description} ${defaultValueString}`
}

function indent (strings) {
  return strings.map(string => `   ${string}`).join('\n')
}

function getName ({name}) {
  return name
}

function getParameters (commands) {
  const parameters = []
  commands.forEach(function (command) {
    if (command.parameters) {
      parameters.push(...command.parameters)
    }
  })
  return parameters
}

module.exports = function usage ({commands, errorMessage}) {
  const lastCommand = commands.slice(-1)[0]
  const {subcommands = [], description} = lastCommand

  const paragraphs = []
  function push (text) {
    paragraphs.push(text)
  }

  if (errorMessage) push(chalk.red(`Error: ${errorMessage}`))

  push(`Usage: ${commands.map(getName).join(' ')} ${subcommands.length > 0 ? SUBCOMMAND_STRING : ''} ${PARAMETERS_STRING}`)

  if (description) push(description)

  let whereOrAnd
  if (subcommands.length > 0) {
    push(`Where ${SUBCOMMAND_STRING} is one of`)
    push(indent(subcommands.map(getName)))
    whereOrAnd = 'and'
  } else {
    whereOrAnd = 'Where'
  }

  const parameters = getParameters(commands)
  if (parameters.length > 0) {
    push(`${whereOrAnd} ${PARAMETERS_STRING} include`)
    push(indent(parameters.map(createVersionString)))
  }

  const text = `\n${paragraphs.join('\n\n')}\n`
  print2(text)
  process.exit(EXIT_STATUSES.USAGE)
}
