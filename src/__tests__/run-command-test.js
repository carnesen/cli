const path = require('path')
const {execFile} = require('@carnesen/child_process')

const {EXIT_STATUSES} = require('../constants')

function callCli (...args) {
  return execFile(path.join(__dirname, 'cli.js'), args)
}

function throwDummyError () {
  throw new Error('Dummy')
}

const MESSAGE = 'foo bar baz'

describe(__filename, function () {
  it('Prints usage if no subcommand is provided', async function () {
    try {
      await callCli()
      throwDummyError()
    } catch (ex) {
      const {code, stderr, stdout} = ex
      code.should.equal(EXIT_STATUSES.USAGE)
      stdout.should.equal('')
      stderr.should.match(/Usage/)
    }
  })
  it('Calls execute and exits 0 if it succeeds', async function () {
    const {stdout, stderr} = await callCli('print', '--message', MESSAGE)
    stderr.should.equal('')
    stdout.should.match(new RegExp(MESSAGE))
  })
  it(`Calls execute and exits ${EXIT_STATUSES.REJECTED} if it fails`, async function () {
    try {
      await callCli('fail', '--message', MESSAGE)
      throwDummyError()
    } catch (ex) {
      const {stdout, stderr} = ex
      stdout.should.equal('')
      stderr.should.match(new RegExp(MESSAGE))
    }
  })
})
