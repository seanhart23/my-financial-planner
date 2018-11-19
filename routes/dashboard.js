var express = require('express');
var router = express.Router({mergeParams: true});
var bill = require('../models/bills');
var debt = require('../models/debt');
var middleware = require('../middleware');


router.get('/', middleware.isLoggedIn, function(req, res){
    bill.find({}, function(err, allBills){ 
        debt.find({}, function(err, allDebts){
            if(err){
                console.log(err);
            } else {
                res.render("dashboard", {bills: allBills, debt: allDebts});
            }
        });
    });
});

module.exports = router;
