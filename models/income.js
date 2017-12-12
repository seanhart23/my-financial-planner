var mongoose = require("mongoose");

//SCHEMA SETUP
var incomeSchema = new mongoose.Schema({
    source: String,
    amount: Number,
});

var income = mongoose.model("income", incomeSchema);

module.exports = income;