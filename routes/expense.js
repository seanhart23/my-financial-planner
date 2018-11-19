var express = require('express');
var router = express.Router({mergeParams: true});
var bill = require('../models/bills');
var middleware = require('../middleware');

router.get('/', middleware.isLoggedIn, function(req, res){
    bill.find({}, function(err, allBills){
        if(err){
            console.log(err);
        } else {
            res.render("expense", {bills: allBills});
        }
    });
});

module.exports = router;
