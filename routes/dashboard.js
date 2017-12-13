var express = require('express');
var router = express.Router();
var bill = require('../models/bills');

router.get('/', function(req, res){
    bill.find({}, function(err, allBills){
        if(err){
            console.log(err);
        } else {
            res.render("dashboard", {bills: allBills});
        }
    });
});

module.exports = router;
