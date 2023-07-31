const { model, Schema } = require('mongoose');

const sch = new Schema({
  Guild: String,
})

module.exports = model('apply', sch)