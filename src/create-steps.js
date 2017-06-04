'use strict'

const {isNumber, isUndefined, stripWhitespace} = require('@carnesen/util')

const {TYPES} = require('./constants')
const parseArgs = require('./parse-args')
const usage = require('./usage')

module.exports = function createSteps (rootCommand, args) {
  const {commandNameArgs, parameterArgs} = parseArgs(args)

  const commands = [rootCommand]
  commandNameArgs.forEach(function (nextCommandName) {
    if (nextCommandName === 'help') usage({commands})

    const currentCommand = commands.slice(-1)[0]
    if (!currentCommand.subcommands) {
      usage({
        commands,
        errorMessage: `Command "${currentCommand.name}" does not have subcommands`,
      })
    }

    const nextCommand = currentCommand.subcommands.find(function (subcommand) {
      return subcommand.name === nextCommandName
    })

    if (!nextCommand) {
      usage({commands, errorMessage: `Bad command "${nextCommandName}"`})
    }

    commands.push(nextCommand)
  })
  const lastCommand = commands.slice(-1)[0]
  if (lastCommand.subcommands && lastCommand.subcommands.length > 0) {
    usage({commands, errorMessage: 'Too few arguments'})
  }

  const steps = []
  const input = {}
  commands.forEach(function (command) {
    const {execute, parameters = []} = command
    parameters.forEach(function (parameter) {
      const index = parameterArgs.findIndex(function (parameterArg) {
        return parameterArg.name === parameter.name
      })
      if (index === -1) {
        // Parameter was not provided as command-line argument
        let defaultValue
        if (parameter.type === TYPES.boolean) {
          // All booleans default to false
          defaultValue = false
        } else {
          // Type is not "boolean"
          if (isUndefined(parameter.defaultValue)) {
            usage({
              commands,
              errorMessage: `Parameter "${parameter.name}" is required`,
            })
          }
          defaultValue = parameter.defaultValue
        }
        input[parameter.name] = defaultValue
      } else {
        // Parameter was provided as command-line argument
        let rawValues = parameterArgs.splice(index, 1)[0].rawValues
        let value
        switch (parameter.type) {
          case TYPES.number:
            if (rawValues.length !== 1) {
              usage({
                commands,
                errorMessage: `Expected parameter "${parameter.name}" to be a single number`,
              })
            }
            value = convertToNumber(rawValues[0])
            break
          case TYPES.boolean:
            if (rawValues.length !== 0) {
              usage({
                commands,
                errorMessage: `Boolean parameters have default "false" and can be set to true as simply "--${parameter.name}"`,
              })
            }
            value = true
            break
          case TYPES.string:
            if (rawValues.length !== 1) {
              usage({
                commands,
                errorMessage: `Expected parameter "${parameter.name}" to be a single string`,
              })
            }
            value = rawValues[0]
            break
          case TYPES.array:
            if (rawValues.length <= 1) {
              usage({
                commands,
                errorMessage: `Expected parameter "${parameter.name}" to be one or more ${parameter.itemType}s`,
              })
            }
            switch (parameter.itemType) {
              case TYPES.string:
                value = rawValues
                break
              case TYPES.number:
                value = rawValues.map(convertToNumber)
                break
              default:
                throw new Error(`Parameter "${parameter.name} of type "${TYPES.array}" has invalid itemType "${parameter.itemType}`)
            }
            break
          default:
            throw new Error(`Parameter "${parameter.name}" has invalid type "${parameter.type}"`)
        }
        input[parameter.name] = value
      }

      function convertToNumber (rawValue) {
        let returnValue
        const strippedRawValue = stripWhitespace(rawValue)
        if (strippedRawValue.length === 0) {
          returnValue = NaN
        } else {
          returnValue = Number(rawValue)
        }
        if (!isNumber(returnValue)) {
          usage({
            commands,
            errorMessage: `Unable to convert parameter "${parameter.name}'s value "${rawValue}" to a number`,
          })
        }
        return returnValue
      }
    })
    if (execute) {
      steps.push(function () {
        return execute(input)
      })
    }
  })
  return steps
}
