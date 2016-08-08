'use strict';

module.exports = function makeUsage(commands) {
  return [
    '%usage',
    '%indent %exe <command> [<options>]',
    '',
    'where <command> is one of:',
    '',
    ['%indent', commands.map(command => command.name).join(', ')]
  ];
};
