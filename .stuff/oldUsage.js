'use strict';

module.exports = function makeHelpCommand(commands) {

  const usage = [
    '%usage',
    '%exe %command <command>',
    '',
    'where <command> is one of:',
    '',
    ['%indent', commands.map(command => command.name).join(', ')]
  ];

  function execute(options) {

    const commandName = options._[0];

    if (!commandName) {
      return Promise.reject(usage);
    }

    const command = commands.find(command => command.name === commandName);

    if (!command) {
      return Promise.reject([
        ['Error: Unknown command "%s"', commandName],
        '',
        ...usage
      ]);
    }

    return Promise.reject(command.usage);

  }

  return {
    name: 'help',
    execute,
    usage
  };

};
