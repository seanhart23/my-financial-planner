var express = require('express');
var router = express.Router();
var accountBalance = require('../models/accountBalance');
var middleware = require('../middleware');

router.get('/', middleware.isLoggedIn, function(req, res){
        accountBalance.find({}, function(err, allaccountBalances){
        if(err){
            console.log(err);
        } else {
            res.render("accountBalance", {accountBalance: allaccountBalances});      
        }
    });
});

router.post('/', middleware.isLoggedIn, function(req, res){
    var amount = req.body.amount;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newaccountBalance = {amount: amount, author: author};
    accountBalance.create(newaccountBalance, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/expense");
        }
    });
});

router.get('/new', middleware.isLoggedIn, function(req, res){
   res.render('accountBalance/new');
});

router.get("/:id", middleware.isLoggedIn, function(req, res){
  accountBalance.findById(req.params.id, function(err, foundaccountBalance){
      if(err){
          console.log(err);
      } else {
          res.render("accountBalance", {accountBalance: foundaccountBalance});
      }
  });
});

router.delete('/:id', middleware.isLoggedIn, function(req, res){
   accountBalance.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/expense');
        } else {
            res.redirect('/accountBalance');
        }
    });    
}); 

router.get('/:id/edit', middleware.isLoggedIn, function(req, res){
    accountBalance.findById(req.params.id, function(err, foundaccountBalance){
        if(err) {
            console.log(err);
        } else {
        res.render('accountBalance/edit', {accountBalance: foundaccountBalance});
        }
    });
});

router.put('/:id', middleware.isLoggedIn, function(req, res){
    accountBalance.findByIdAndUpdate(req.params.id, req.body, function(err, updatedaccountBalance){
        if(err){
            res.redirect('err');
        } else {
            res.redirect('/expense');
        }
    });    
});

module.exports = router;
