'use strict';

const co = require('co');

const debug = require('./debug');
const usage = require('./usage');
const parsedToPassed = require('./parsedToPassed');

module.exports = function run(command, parsed) {

  command.path = [ ...command.path, command.name ];

  debug(`run ${ command.path }` );

  const { commands: subcommands, execute } = command;

  if (execute) {
    // execute
    const passed = parsedToPassed(command, parsed);
    debug(`execute ${ command.path }`);
    co(function* () {
      try {
        const result = yield execute(passed);
        debug('success :)');
        console.log(result); // eslint-disable-line no-console
        process.exit(0);
      } catch (ex) {
        debug('failed :(');
        console.error(ex); // eslint-disable-line no-console
        process.exit(1);
      }
    });
  } else {
    // commands
    const name = parsed._[0];
    const subcommand = subcommands.find(subcommand => subcommand.name === name);
    if (subcommand) {
      // found matching subcommand
      parsed._.splice(0, 1);
      subcommand.args = command.args;
      subcommand.path = command.path;
      subcommand.parameters = [...command.parameters, ...(subcommand.parameters || [])];
      run(subcommand, parsed);
    } else {
      // no matching subcommand
      command.parameters.unshift({
        name: 'subcommand',
        type: 'string',
        positional: true,
        description: `one of ${ subcommands.map(subcommand => subcommand.name).join(', ') }`
      });
      usage(command, true);
    }
  }

};


