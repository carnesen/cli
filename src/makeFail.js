'use strict';

const { format } = require('util');

module.exports = function makeFail(name, args) {

  function replace(str) {

    const commandStr = [name, ...args.map(arg => format("%s", arg))].join(' ');

    const replacements = {
      'bad-command': 'Error: Bad command: ' + commandStr,
      indent: '   ',
      usage: 'Usage:\n'
    };

    return Object.keys(replacements).reduce((previousString, key) =>
      previousString.replace(new RegExp('%' + key, 'g'), replacements[key]), str);

  }

  return function fail(arr) {
    arr.unshift('');
    arr.forEach(item => {
      if (typeof item === 'string') {
        item = [item];
      }
      console.error(...item.map(replace)); // eslint-disable-line no-console
    });
    process.exit(1);
  }
};
