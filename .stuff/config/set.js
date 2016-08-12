'use strict';

const { constants, util } = require('bitcoin-rpc');
const ini = require('ini');

const { configFile } = require('./constants');
const get = require('./get');

const usage = [
  '%usage',
  '%indent %exe %command set <key> <value>',
  '',
  'The valid configuration keys are:',
  ['%indent', constants.validOptions.join(', ')]
];

function set(options) {

  const [key, value] = options._;

  return get()

    .then(config => {

      if (!key) {
        throw usage;
      }

      if (constants.validOptions.indexOf(key) === -1) {

        throw [
          ['Error: Invalid configuration key "%s"', key],
          '',
          ...usage
        ];

      }

      if (!value) {
        throw [
          'Error: A configuration value must be provided',
          '',
          ...usage
        ];
      }

      Object.assign(config, { [key]: value });

      const content = ini.stringify(config);
      return util.writeFile(configFile, content)
        .then(() => content);

    });
}

set.usage = usage;

module.exports = set;

