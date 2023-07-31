const { model, Schema } = require('mongoose');

const sch = new Schema({
  View: String,

  Name: String,
  Description: String,
  Type: String,
  Amount: Number,
})

module.exports = model('prd', sch)