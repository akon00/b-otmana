const mongoose = require("mongoose");

const Orders = new mongoose.Schema({
 OrderId: String,
 BotMaker: String,
});
module.exports = mongoose.model("Orders", Orders);
