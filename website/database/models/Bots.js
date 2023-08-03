const mongoose = require("mongoose");

const Bots = new mongoose.Schema({
  owner: String,
  bot: String,
  path: String,
  expire: Number
});
module.exports = mongoose.model("Bots", Bots);