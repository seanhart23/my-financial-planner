var mongoose = require("mongoose");

//SCHEMA SETUP
var debtSchema = new mongoose.Schema({
    itemLabel: String,
    type: String,
    last_update: String,
    amount: Number,
    interestRate: Number,
    monthlyPayment: Number,
    dueDate: String,
    website: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        username: String
    }
});

module.exports = mongoose.model("debt", debtSchema);