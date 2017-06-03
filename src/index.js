'use strict'
const {print2} = require('@carnesen/util')

const plan = require('./plan')
const {FIELD_TYPES, REJECTION_EXIT_STATUS} = require('./constants')

function cli (command) {
  const steps = plan(command)

  async function doSteps () {
    for (let step of steps) {
      await step()
    }
    process.exit(0)
  }

  function handleRejection (ex) {
    print2(ex)
    process.exit(REJECTION_EXIT_STATUS)
  }

  doSteps().catch(handleRejection)
}

cli.FIELD_TYPES = FIELD_TYPES

module.exports = cli
