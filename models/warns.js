const { model, Schema } = require('mongoose');

const sch = new Schema({
  Guild: String,
  User : String,
  Array: Array,
})

module.exports = model('warns', sch)