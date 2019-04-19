var mongoose = require("mongoose");

//SCHEMA SETUP
var extraAmountSchema = new mongoose.Schema({
    amount: Number,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        username: String
    }
});

module.exports = mongoose.model("extraAmount", extraAmountSchema);