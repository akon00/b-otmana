const { model, Schema } = require('mongoose');

const sch = new Schema({
  id: String,
  tokens: Number,
})

module.exports = model('tkn', sch)