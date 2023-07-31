const { model, Schema } = require('mongoose');

const sch = new Schema({
  id: String,
  coins: Number,
})

module.exports = model('eco', sch)