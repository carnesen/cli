'use strict'

const {print2} = require('@carnesen/util')

const {EXIT_STATUSES} = require('./constants')
const createSteps = require('./create-steps')

module.exports = async function runCommand (rootCommand, args) {
  try {
    const steps = createSteps(rootCommand, args)
    for (let step of steps) {
      await step()
    }
  } catch (ex) {
    print2(ex)
    process.exit(EXIT_STATUSES.REJECTED)
  }
  process.exit(EXIT_STATUSES.SUCCESS)
}
