const parseArgs = require('../parse-args')

describe(__filename, function () {
  it('parses an array of args', function () {
    const parsedArgs = parseArgs(['a', '--b', 'foo', 'bar'])
    parsedArgs.should.deep.equal({
      parameterArgs: [{name: 'b', rawValues: ['foo', 'bar']}],
      commandNameArgs: ['a']})
  })
})
