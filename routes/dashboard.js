var express        = require('express');
var router         = express.Router({mergeParams: true});
var bill           = require('../models/bills');
var debt           = require('../models/debt');
var startingDebt   = require('../models/startingDebt');
var accountBalance = require('../models/accountBalance');
var monthlyIncome  = require('../models/monthlyIncome');
var favorites      = require('../models/favorites');
var middleware     = require('../middleware');


router.get('/', middleware.isLoggedIn, function(req, res){
    bill.find({}, function(err, allBills){ 
        debt.find({}, function(err, allDebts){
            startingDebt.find({}, function(err, allStartingDebts){
                accountBalance.find({}, function(err, allaccountBalances){
                    monthlyIncome.find({}, function(err, allmonthlyIncome){
                        favorites.find({}, function(err, allfavorites){
            if(err){
                console.log(err);
            } else {
                res.render("dashboard", {bills: allBills, debt: allDebts, startingDebt: allStartingDebts, accountBalance: allaccountBalances, monthlyIncome: allmonthlyIncome, favorites: allfavorites});
            }
            });
            });
        });
    });
});
});
});

module.exports = router;
