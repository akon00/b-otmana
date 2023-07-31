const mongoose = require("mongoose");

const mongooseConnectionString = process.env.mongooseConnectionString;
if (!mongooseConnectionString) return;

mongoose.connect(mongooseConnectionString)
