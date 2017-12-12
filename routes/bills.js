var express = require('express');
var router = express.Router();
var bill = require('../models/bills');

router.get('/', function(req, res){
        bill.find({}, function(err, allBills){
        if(err){
            console.log(err);
        } else {
            res.render("bills/index", {bills: allBills});      
        }
    });
});

router.post('/', function(req, res){
    var payee = req.body.payee;
    var type = req.body.type;
    var amountDue = req.body.amountDue;
    var dueDate = req.body.dueDate;
    var autoPay = req.body.autoPay;
    var website = req.body.website;
    var newBill = {payee: payee, type: type, amountDue: amountDue, dueDate: dueDate, autoPay: autoPay, website: website};
    bill.create(newBill, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/bills");
        }
    });
});

router.get('/new', function(req, res){
   res.render('bills/new');
});

router.get("/:id", function(req, res){
  bill.findById(req.params.id, function(err, foundBill){
      if(err){
          console.log(err);
      } else {
          res.render("bills/show", {bill: foundBill});
      }
  });
});

router.delete('/:id', function(req, res){
   bill.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/bills');
        } else {
            res.redirect('/bills');
        }
    });    
}); 

router.get('/:id/edit', function(req, res){
    bill.findById(req.params.id, function(err, foundBill){
        if(err) {
            console.log(err);
        } else {
        res.render('bills/edit', {bill: foundBill});
        }
    });
});

router.put('/:id', function(req, res){
    bill.findByIdAndUpdate(req.params.id, req.body.bill, function(err, updatedBill){
        if(err){
            res.redirect('/bills');
        } else {
            console.log(req.body.bill);
            res.redirect('/bills/' + req.params.id);
        }
    });    
});

module.exports = router;
