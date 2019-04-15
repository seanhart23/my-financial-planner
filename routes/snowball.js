var express = require('express');
var router = express.Router();
var debt = require('../models/debt');
var startingDebt = require('../models/startingDebt');
var middleware = require('../middleware');

router.get('/', middleware.isLoggedIn, function(req, res){
    debt.find({}, function(err, allDebts){
        startingDebt.find({}, function(err, allstartingDebts){
            if(err){
                console.log(err);
            } else {
                res.render("snowball", {debt: allDebts, startingDebt: allstartingDebts});
            }
        });
    });
});

module.exports = router;
