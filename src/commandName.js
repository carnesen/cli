'use strict';

let commandName = '';

module.exports = {

  get() {
    return commandName;
  },

  set(str) {
    commandName = str;
  }

};
