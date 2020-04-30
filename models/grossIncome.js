var mongoose = require("mongoose");

//SCHEMA SETUP
var grossIncomeSchema = new mongoose.Schema({
    amount: Number,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        username: String
    }
});

module.exports = mongoose.model("grossIncome", grossIncomeSchema);