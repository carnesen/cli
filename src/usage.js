'use strict';

const INDENT = '   ';

module.exports = function usage(commandNames, options) {

  options = options || {};

  const commandLine = [INDENT, ...commandNames];
  const whereLines = [];

  if (options._) {
    options._.forEach(option => {
      const nameStr = `<${option.name}>`;
      if (option.required) {
        commandLine.push(`[ ${nameStr} ]`)
      }
      whereLines.push(`${ INDENT }${ nameStr } is ${ option.description }`)
    });
  }

  return [
    'Usage:',
    commandLine,
    '',
    'where',
    '',
    ...whereLines
  ]
};
