var mongoose = require("mongoose");

//SCHEMA SETUP
var sbSchema = new mongoose.Schema({
    startingBalance: Number,
    authUser: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        username: String
    }
});

module.exports = mongoose.model("sb", sbSchema);