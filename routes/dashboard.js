var express = require('express');
var router = express.Router();
var bill = require('../models/bills');
var income = require('../models/income');

router.get('/', function(req, res){
    bill.find({}, function(err, allBills){
        if(err){
            console.log(err);
        } else {
            income.find({}, function(err, allIncome){
                if(err){
                    console.log(err);
                } else {
                    res.render("dashboard", {bills: allBills, income: allIncome});
                }
            });
        }
    });
});

module.exports = router;
