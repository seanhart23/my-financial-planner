var express = require('express');
var router = express.Router();
var monthlyIncome = require('../models/monthlyIncome');
var middleware = require('../middleware');

router.get('/', middleware.isLoggedIn, function(req, res){
        monthlyIncome.find({}, function(err, allmonthlyIncome){
        if(err){
            console.log(err);
        } else {
            res.render("monthlyIncome", {monthlyIncome: allmonthlyIncome});      
        }
    });
});

router.post('/', middleware.isLoggedIn, function(req, res){
    var amount = req.body.amount;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newmonthlyIncome = {amount: amount, author: author};
    monthlyIncome.create(newmonthlyIncome, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/dashboard");
        }
    });
});

router.get('/new', middleware.isLoggedIn, function(req, res){
   res.render('monthlyIncome/new');
});

router.get("/:id", middleware.isLoggedIn, function(req, res){
  monthlyIncome.findById(req.params.id, function(err, foundMonthlyIncome){
      if(err){
          console.log(err);
      } else {
          res.render("monthlyIncome", {monthlyIncome: foundMonthlyIncome});
      }
  });
});

router.delete('/:id', middleware.isLoggedIn, function(req, res){
   monthlyIncome.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/dashboard');
        } else {
            res.redirect('/dashboard');
        }
    });    
}); 

router.get('/:id/edit', middleware.isLoggedIn, function(req, res){
    monthlyIncome.findById(req.params.id, function(err, foundMonthlyIncome){
        if(err) {
            console.log(err);
        } else {
        res.render('monthlyIncome/edit', {monthlyIncome: foundMonthlyIncome});
        }
    });
});

router.put('/:id', middleware.isLoggedIn, function(req, res){
    monthlyIncome.findByIdAndUpdate(req.params.id, req.body, function(err, updatedmonthlyIncome){
        if(err){
            res.redirect('err');
        } else {
            res.redirect('/dashboard');
        }
    });    
});

module.exports = router;
