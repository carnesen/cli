const path = require('path')
const {execFile} = require('@carnesen/child_process')

const {REJECTION_EXIT_STATUS, USAGE_EXIT_STATUS} = require('../constants')

function callTestCli (...args) {
  return execFile(path.join(__dirname, 'test-cli.js'), args)
}

function throwDummyError () {
  throw new Error('Dummy')
}

const MESSAGE = 'foo bar baz'

describe(__filename, function () {
  it('Prints usage if no subcommand is provided', async function () {
    try {
      await callTestCli()
      throwDummyError()
    } catch (ex) {
      const {code, stderr, stdout} = ex
      code.should.equal(USAGE_EXIT_STATUS)
      stdout.should.equal('')
      stderr.should.match(/Usage/)
    }
  })
  it('Calls execute and exits 0 if it succeeds', async function () {
    const {stdout, stderr} = await callTestCli('print', '--message', MESSAGE)
    stderr.should.equal('')
    stdout.should.match(new RegExp(MESSAGE))
  })
  it(`Calls execute and exits ${REJECTION_EXIT_STATUS} if it fails`, async function () {
    try {
      await callTestCli('fail', '--message', MESSAGE)
      throwDummyError()
    } catch (ex) {
      const {stdout, stderr} = ex
      stdout.should.equal('')
      stderr.should.match(new RegExp(MESSAGE))
    }
  })
})
