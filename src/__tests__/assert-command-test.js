const assertCommand = require('../assert-command')

const command = require('./cli')

describe(__filename, function () {
  it('validates a command', function () {
    assertCommand(command)
  })
})
