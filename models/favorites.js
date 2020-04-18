var mongoose = require("mongoose");

//SCHEMA SETUP
var favoritesSchema = new mongoose.Schema({
    website: String,
    label: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        username: String
    }
});

module.exports = mongoose.model("favoritesIncome", favoritesSchema);