var express = require('express');
var router = express.Router({mergeParams: true});
var bill = require('../models/bills');
var accountBalance = require('../models/accountBalance');
var middleware = require('../middleware');

router.get('/', middleware.isLoggedIn, function(req, res){
    bill.find({}, function(err, allBills){ 
        accountBalance.find({}, function(err, allaccountBalances){
            if(err){
                console.log(err);
            } else {
                res.render("expense", {bills: allBills, accountBalance: allaccountBalances});
            }
        });
    });
});

module.exports = router;
