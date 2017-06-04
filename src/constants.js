'use strict'
const keyMirror = require('keymirror')

const EXIT_STATUSES = {
  SUCCESS: 0,
  REJECTED: 1,
  USAGE: 2,
}

const TYPES = keyMirror({
  array: null,
  boolean: null,
  number: null,
  string: null,
})

module.exports = {
  EXIT_STATUSES,
  TYPES,
}
