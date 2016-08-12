'use strict';

const util = require('@carnesen/util');

module.exports = function validateCommands(commands) {

  util.throwIfNotArray(commands);

  commands.forEach(command => {

    util.throwIfNotObject(command);

    const { name, description, commands: subcommands, execute, options } = command;

    util.throwIfNotString(name, 'name');
    util.throwIfNotString(description, 'description');
    util.throwIf(!execute && !subcommands, 'Expected to find "execute" or "commands"');
    util.throwIf(execute && subcommands, 'Expected to find "execute" or "commands" but not both');

    if (subcommands) {
      return validateCommands(subcommands);
    }

    // execute
    util.throwIfNotFunction(execute, 'execute');

    if (util.isDefined(options)) {
      util.throwIfNotObject(options);
      const positionalOptions = options._;
      if (util.isDefined(positionalOptions)) {
        util.throwIfNotArray(positionalOptions, 'positionalOptions');
        let foundOptional = false;
        positionalOptions.forEach(option => {
          validateOption(option);
          if (option.required) {
            if (foundOptional) {
              throw new Error('Expected required positional arguments to be at the front of the array');
            }
          } else {
            foundOptional = true;
          }
        });

        delete options._;

      }

      if (!util.isEmptyObject(options)) {
        Object.keys(options).forEach(name => {
          validateOption(Object.assign(options[name], { name }));
        });
      }

    }

    function validateOption(option) {
      util.throwIfNotObject(option, 'option');
      util.throwIfNotString(option.name, 'option.name');
      util.throwIfNotString(option.description, 'option.description');
      util.throwIfNotString(option.type, 'option.type');
      const required = option.required;
      if (util.isDefined(required)) {
        util.throwIfNotBoolean(required);
      }
      if (util.isDefined(option.enum)) {
        util.throwIfNotArray(options.enum);
      }
    }

  })

};
