'use strict'

const {assertArray} = require('@carnesen/util')

module.exports = function parseArgs (args) {
  assertArray(args, 'args')
  const parameterArgs = []
  const commandNameArgs = []
  let currentArray = commandNameArgs
  args.forEach(function (arg) {
    const matches = arg.match(/^--(.*)/)
    if (matches) {
      const name = matches[1]
      const existingCommandArg = parameterArgs.find(function (commandArg) {
        return commandArg.name === name
      })
      if (existingCommandArg) {
        throw new Error('Each parameter can be provided at most one time')
      } else {
        currentArray = []
        parameterArgs.push({name, rawValues: currentArray})
      }
    } else {
      currentArray.push(arg)
    }
  })
  return {
    parameterArgs,
    commandNameArgs,
  }
}
