var express = require('express');
var router = express.Router();
var bill = require('../models/bills');
var middleware = require('../middleware');

router.get('/', middleware.isLoggedIn, function(req, res){
        bill.find({}, function(err, allBills){
        if(err){
            console.log(err);
        } else {
            res.render("bills/index", {bills: allBills});      
        }
    });
});

router.post('/', middleware.isLoggedIn, function(req, res){
    var payee = req.body.payee;
    var type = req.body.type;
    var amountDue = req.body.amountDue;
    var dueDate = req.body.dueDate;
    var autoPay = req.body.autoPay;
    var website = req.body.website;
    var authUser = req.body.authUser;
    var author = {
        id: req.user._id,
        username: req.user.username,
        name: req.user.name
    };
    var newBill = {payee: payee, type: type, amountDue: amountDue, dueDate: dueDate, autoPay: autoPay, website: website, author: author, authUser: authUser};
    bill.create(newBill, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/dashboard");
        }
    });
});

router.get('/new', middleware.isLoggedIn, function(req, res){
   res.render('bills/new');
});

router.get("/:id", middleware.isLoggedIn, function(req, res){
  bill.findById(req.params.id, function(err, foundBill){
      if(err){
          console.log(err);
      } else {
          res.render("dashboard", {bill: foundBill});
      }
  });
});

router.delete('/:id', middleware.isLoggedIn, function(req, res){
   bill.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/dashboard');
        } else {
            res.redirect('/dashboard');
        }
    });    
}); 

router.get('/:id/edit', middleware.isLoggedIn, function(req, res){
    bill.findById(req.params.id, function(err, foundBill){
        if(err) {
            console.log(err);
        } else {
        res.render('bills/edit', {bill: foundBill});
        }
    });
});

router.put('/:id', middleware.isLoggedIn, function(req, res){
    bill.findByIdAndUpdate(req.params.id, req.body.bill, function(err, updatedBill){
        if(err){
            res.redirect('/dashboard');
        } else {
            res.redirect('/dashboard');
        }
    });    
});

module.exports = router;
