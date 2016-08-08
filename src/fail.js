'use strict';

const commandName = require('./commandName');

function replace(str) {

  const replacements = {
    command: commandName.get(),
    exe: 'bitcoin-rpc',
    indent: '   ',
    usage: 'Usage:\n'
  };

  return Object.keys(replacements).reduce((previousString, key) =>
    previousString.replace(new RegExp('%' + key, 'g'), replacements[key]), str);

}

module.exports = function fail(arr) {
  arr.unshift('');
  arr.forEach(item => {
    if (typeof item === 'string') {
      item = [item];
    }
    console.error(...item.map(replace)); // eslint-disable-line no-console
  });
  process.exit(1);
};
