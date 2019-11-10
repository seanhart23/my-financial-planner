var mongoose = require("mongoose");

//SCHEMA SETUP
var budgetIncomeSchema = new mongoose.Schema({
    income: String,
    date: Number,
    amount: Number,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        username: String
    }
});

module.exports = mongoose.model("budgetIncome", budgetIncomeSchema);