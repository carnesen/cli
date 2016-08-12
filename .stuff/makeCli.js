'use strict';

const parseArgs = require('minimist');

const bitcoinRpc = require('bitcoin-rpc');

const config = require('./config');
const commandName = require('./commandName');
const fail = require('./fail');
const makeHelpCommand = require('./makeHelpCommand');
const makeUsage = require('./makeUsage');
const succeed = require('./succeed');

const options = parseArgs(process.argv.slice(2));

commandName.set(options._[0]);
options._.splice(0, 1);

const commands = [
  config.command,
  ...(bitcoinRpc.methods.filter(method => method.name !== 'help').map(makeRpcCommand))
];

const helpCommand = makeHelpCommand(commands);

commands.unshift(helpCommand);

const usage = makeUsage(commands);

if (!commandName.get()) {
  fail(usage);
}

const command = commands.find(command => command.name === commandName.get());

if (!command) {
  fail([
    ['Error: Unknown command "%s"', commandName.get()],
    '',
    ...usage
  ]);
}

command.execute(options)
  .then(succeed)
  .catch(fail)
  .catch(err => setTimeout(() => {
    throw err;
  }));
