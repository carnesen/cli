'use strict'
const keyMirror = require('keymirror')

const FIELD_TYPES = keyMirror({
  BOOLEAN: null,
  STRING: null,
  NUMBER: null,
})

module.exports = {
  FIELD_TYPES,
  USAGE_EXIT_STATUS: 2,
  REJECTION_EXIT_STATUS: 1,
}
