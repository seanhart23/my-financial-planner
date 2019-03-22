var express = require('express');
var router = express.Router({mergeParams: true});
var bill = require('../models/bills');
var startingDebt = require('../models/startingDebt');
var middleware = require('../middleware');

// router.get('/', middleware.isLoggedIn, function(req, res){
//     bill.find({}, function(err, allBills){
//         if(err){
//             console.log(err);
//         } else {
//             res.render("expense", {bills: allBills});
//         }
//     });
// });

router.get('/', middleware.isLoggedIn, function(req, res){
    bill.find({}, function(err, allBills){ 
        startingDebt.find({}, function(err, allstartingDebts){
            if(err){
                console.log(err);
            } else {
                res.render("expense", {bills: allBills, startingDebt: allstartingDebts});
            }
        });
    });
});

module.exports = router;
