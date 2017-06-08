'use strict'

const {
  assertArray,
  assertNumber,
  assertFunction,
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
  const parameterString = `parameter "${name}" of ${commandString}`
  assertNonEmptyString(name, `"name" of ${parameterString}`)
  assertNonEmptyString(description, `"description" of ${parameterString}`)
  switch (type) {
    case TYPES.boolean:
      assertUndefined(defaultValue, `defaultValue of boolean ${parameterString}`)
      break
    case TYPES.number:
      if (isDefined(defaultValue)) {
        assertNumber(defaultValue, `defaultValue of ${parameterString}`)
      }
      break
    case TYPES.string:
      if (isDefined(defaultValue)) {
        assertString(defaultValue, `defaultValue of ${parameterString}`)
      }
      break
    case TYPES.array:
      switch (itemType) {
        case TYPES.boolean:
          throw new Error(`The ${parameterString} has type "array" and itemType "boolean"`)
        case TYPES.number:
          if (isDefined(defaultValue)) {
            assertArray(defaultValue, `defaultValue of ${parameterString}`)
            defaultValue.forEach(function (defaultValueItem) {
              assertNumber(defaultValueItem, `each item of defaultValue of array ${parameterString}`)
            })
          }
          break
        case TYPES.string:
          if (isDefined(defaultValue)) {
            assertArray(defaultValue, `defaultValue of ${parameterString}`)
            defaultValue.forEach(function (defaultValueItem) {
              assertString(defaultValueItem, `each item of defaultValue of array ${parameterString}`)
            })
          }
          break
        default:
          throw createTypeError(`itemType of ${parameterString}`, `either ${TYPES.string} or ${TYPES.number}`)
      }
      break
    default:
      throw createTypeError(`type of ${parameterString}`, `one of ${Object.keys(TYPES).join(', ')}`)
  }
}

module.exports = function assertCommand (command, parentCommands = []) {
  assertNonEmptyObject(command, 'command')
  const {name, description, execute, parameters, subcommands} = command
  let commandString
  if (parentCommands.length === 0) {
    commandString = 'command'
  } else {
    commandString = `subcommand ${parentCommands.map(command => command.name).join('.')}`
  }
  assertNonEmptyString(name, `"name" of ${commandString}`)
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
