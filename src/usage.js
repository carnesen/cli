'use strict';

const { isString } = require('@carnesen/util');

const INDENT = '   ';

module.exports = function usage(command, badCommand = false) {

  let arr = [''];

  if (badCommand) {
    arr = arr.concat([
      [
        'Error: Bad command:',
        command.path[0],
        ...command.args.map(arg => arg.includes(' ') ? `'${ arg }'` : arg)
      ],
      ''
    ]);
  }

  arr = arr.concat(['Usage:', '']);

  const commandLine = [INDENT, ...command.path];
  const whereLines = [];

  command.parameters.forEach(parameter => {

    // command subcommand [ --flag-param ] [ --string-param <string> ] [ <positional-opt> ]
    let commandLineString;

    if (parameter.positional) {
      // positional parameter
      commandLineString = `<${ parameter.name }>`;
    } else {
      // named parameter
      commandLineString = `--${ parameter.name } <${ parameter.type }>`;
    }

    if (parameter.default) {
      commandLineString = `[ ${ commandLineString } ]`;
    }

    /*
     flag-param (boolean) is ...
     string-param (string) is ...
     positional-param (string) is ... (default: 'foo')
     */

    commandLine.push(commandLineString);

    let whereLine = `${ INDENT }${ parameter.name } (${ parameter.type }) is ${ parameter.description }`;

    if (parameter.default) {
      whereLine = `${ whereLine } (default: ${ parameter.default })`;
    }

    whereLines.push(whereLine);

  });

  arr = arr.concat([commandLine, '', 'where', '', ...whereLines, '']);

  arr.forEach(item => {
    if (isString(item)) {
      item = [item];
    }
    console.error(item.join(' ')); // eslint-disable-line no-console
  });

  process.exit(1);

};
