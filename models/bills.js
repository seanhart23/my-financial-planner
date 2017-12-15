var mongoose = require("mongoose");

//SCHEMA SETUP
var billSchema = new mongoose.Schema({
    payee: String,
    type: String,
    amountDue: Number,
    dueDate: String,
    autoPay: String,
    website: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: String
    },
});

var bill = mongoose.model("bill", billSchema);

module.exports = mongoose.model("bill", billSchema);