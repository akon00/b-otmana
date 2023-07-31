const { model, Schema } = require('mongoose');

const sch = new Schema({
  id: String,
  inventory: Object,
})

module.exports = model('inv', sch)