'use strict';

const set = require('./set');
const show = require('./show');
const usage = require('./usage');

const subCommandMap = { set, show };

function execute(options) {

  const subCommand = options._[0];
  options._.splice(0, 1);

  if (!subCommand) {
    return Promise.reject(usage);
  }

  if (!subCommandMap[subCommand]) {
    return Promise.reject([
      ['Error: Bad subcommand "%s"', subCommand],
      '',
      ...usage
    ]);
  }

  return subCommandMap[subCommand](options);

}

module.exports = {
  execute,
  name: 'config',
  usage
};
