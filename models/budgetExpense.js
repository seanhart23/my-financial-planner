var mongoose = require("mongoose");

//SCHEMA SETUP
var budgetExpenseSchema = new mongoose.Schema({
    expense: String,
    date: String,
    amount: Number,
    category: String,
    type: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        username: String
    }
});

module.exports = mongoose.model("budgetExpense", budgetExpenseSchema);