'use strict'

const {
  assertArray,
  assertNumber,
  assertFunction,
  assertKebabCasedString,
  assertNonEmptyArray,
  assertNonEmptyString,
  assertNonEmptyObject,
  assertString,
  assertUndefined,
  createTypeError,
  isDefined,
  isUndefined,
} = require('@carnesen/util')

const {TYPES} = require('./constants')

function assertParameter (parameter, commandString) {
  assertNonEmptyObject(parameter, `each parameter of ${commandString}`)
  const {name, description, type, itemType, defaultValue} = parameter
  assertNonEmptyString(name, `"name" of each parameter of ${commandString}`)
  const parameterString = `parameter "${name}" of ${commandString}`
  assertKebabCasedString(name, `"name" of ${parameterString}`)
  assertNonEmptyString(description, `"description" of ${parameterString}`)
  switch (type) {
    case TYPES.boolean:
      assertUndefined(defaultValue, `"defaultValue" of boolean ${parameterString}`)
      break
    case TYPES.number:
      if (isDefined(defaultValue)) {
        assertNumber(defaultValue, `"defaultValue" of ${parameterString}`)
      }
      break
    case TYPES.string:
      if (isDefined(defaultValue)) {
        assertString(defaultValue, `"defaultValue" of ${parameterString}`)
      }
      break
    case TYPES.array:
      switch (itemType) {
        case TYPES.boolean:
          throw createTypeError(
            `"itemType" of array ${parameterString}`,
            `"${TYPES.number}" or "${TYPES.string}"`,
          )
        case TYPES.number:
          if (isDefined(defaultValue)) {
            assertArray(defaultValue, `"defaultValue" of ${parameterString}`)
            defaultValue.forEach(function (defaultValueItem) {
              assertNumber(defaultValueItem, `each item of defaultValue of array ${parameterString}`)
            })
          }
          break
        case TYPES.string:
          if (isDefined(defaultValue)) {
            assertArray(defaultValue, `"defaultValue" of ${parameterString}`)
            defaultValue.forEach(function (defaultValueItem) {
              assertString(defaultValueItem, `each item of defaultValue of array ${parameterString}`)
            })
          }
          break
        default:
          throw createTypeError(`"itemType" of ${parameterString}`, `either "${TYPES.string}" or "${TYPES.number}"`)
      }
      break
    default:
      throw createTypeError(`"type" of ${parameterString}`, `one of ${Object.keys(TYPES).join(', ')}`)
  }
}

function getPath (commands) {
  return commands.map(command => command.name).join('.')
}

module.exports = function assertCommand (command, parentCommands = []) {
  assertNonEmptyObject(command, 'command')
  const {name, description, execute, parameters, subcommands} = command
  assertNonEmptyString(
    name,
    parentCommands.length === 0
      ? '"name" of command'
      : `"name" of each subcommand of "${getPath(parentCommands)}"`
  )
  const commandString = `command "${getPath([...parentCommands, command])}"`
  assertNonEmptyString(description, `"description" of ${commandString}`)
  if (isDefined(execute)) assertFunction(execute, `"execute" ${commandString}`)
  if (isDefined(parameters)) {
    assertArray(parameters, `"parameters" of ${commandString}`)
    parameters.forEach(function (parameter) {
      assertParameter(parameter, commandString)
    })
  }
  if (isUndefined(subcommands) && isUndefined(execute)) {
    throw createTypeError(`"execute" or "subcommands" of ${commandString}`, 'defined')
  }
  if (isDefined(subcommands)) {
    assertNonEmptyArray(subcommands, `"subcommands" of ${commandString}`)
    subcommands.forEach(function (subcommand) {
      assertCommand(subcommand, [...parentCommands, command])
    })
  }
}
