var express = require('express');
var router = express.Router({mergeParams: true});
var bill = require('../models/bills');
var debt = require('../models/debt');
var startingDebt = require('../models/startingDebt');
var middleware = require('../middleware');


router.get('/', middleware.isLoggedIn, function(req, res){
    bill.find({}, function(err, allBills){ 
        debt.find({}, function(err, allDebts){
            startingDebt.find({}, function(err, allStartingDebts){
            if(err){
                console.log(err);
            } else {
                res.render("dashboard", {bills: allBills, debt: allDebts, startingDebt: allStartingDebts});
            }
            });
        });
    });
});

module.exports = router;
