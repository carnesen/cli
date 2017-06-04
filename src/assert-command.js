'use strict'

const {
  assertArray,
  assertNumber,
  assertFunction,
  assertNonEmptyString,
  assertNonEmptyObject,
  assertString,
  assertUndefined,
  createTypeError,
  isDefined,
} = require('@carnesen/util')

const {TYPES} = require('./constants')

function assertParameter (parameter, commandNamesString) {
  const commandString = `command ${commandNamesString}`
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

module.exports = function assertCommand (command, commandNamesString = '') {
  assertNonEmptyObject(command)
  const {name, description, execute, parameters, subcommands} = command
  const commandString = `command ${commandNamesString}'s`
  assertNonEmptyString(name, `${commandString} name`)
  assertNonEmptyString(description, `${commandString} description`)
  if (isDefined(execute)) assertFunction(execute, `${commandString} execute`)
  if (isDefined(parameters)) {
    assertArray(parameters, `${commandString} parameters`)
    parameters.forEach(function (parameter) {
      assertParameter(parameter, commandNamesString)
    })
  }
  if (isDefined(subcommands)) {
    assertArray(subcommands, `${commandString} subcommands`)
    subcommands.forEach(function (subcommand) {
      assertCommand(subcommand, `${commandNamesString}.${name}`)
    })
  }
}
