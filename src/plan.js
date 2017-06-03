'use strict'
const parseArgs = require('minimist')

const {isDefined} = require('@carnesen/util')

const usage = require('./usage')

const ARGS = process.argv.slice(2)

const parsedArgs = parseArgs(ARGS)
const {_: COMMAND_ARGS} = parseArgs(ARGS)
const OPTION_ARGS = Object.assign({}, parsedArgs)
delete OPTION_ARGS._

module.exports = function plan (rootCommand) {
  function recurse (commandStack, commandArgStack, steps) {
    const command = commandStack.slice(-1)[0]

    const {options = [], subcommands = [], execute = function () {}} = command

    // Prepare optionValues for this step
    const optionValues = {}
    options.forEach(function ({name, defaultValue}) {
      let value = OPTION_ARGS[name]
      if (isDefined(value)) {
        optionValues[name] = value
      } else {
        if (isDefined(defaultValue)) {
          optionValues[name] = defaultValue
        } else {
          usage(commandStack, `Option "${name}" is required`)
        }
      }
    })

    function step () {
      return execute(optionValues)
    }

    steps = [...steps, step]

    // Recurse into subcommands, if necessary
    const [commandArg, ...nextCommandArgStack] = commandArgStack
    if (commandArg) {
      const nextCommand = subcommands.find(function (subcommand) {
        return subcommand.name === commandArg
      })
      if (!nextCommand) {
        usage(commandStack)
      } else {
        const nextCommandStack = [...commandStack, nextCommand]
        const nextSteps = [...steps]
        steps = recurse(nextCommandStack, nextCommandArgStack, nextSteps)
      }
    } else {
      // !currentCommandArg
      if (subcommands.length > 0) {
        usage(commandStack)
      }
    }
    return steps
  }

  return recurse([rootCommand], [...COMMAND_ARGS], [])
}
