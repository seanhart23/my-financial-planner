var express = require('express');
var router = express.Router();
var grossIncome = require('../models/grossIncome');
var middleware = require('../middleware');

router.get('/', middleware.isLoggedIn, function(req, res){
        grossIncome.find({}, function(err, allgrossIncome){
        if(err){
            console.log(err);
        } else {
            res.render("grossIncome", {grossIncome: allgrossIncome});      
        }
    });
});

router.post('/', middleware.isLoggedIn, function(req, res){
    var amount = req.body.amount;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newgrossIncome = {amount: amount, author: author};
    grossIncome.create(newgrossIncome, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/dashboard");
        }
    });
});

router.get('/new', middleware.isLoggedIn, function(req, res){
   res.render('grossIncome/new');
});

router.get("/:id", middleware.isLoggedIn, function(req, res){
  grossIncome.findById(req.params.id, function(err, foundgrossIncome){
      if(err){
          console.log(err);
      } else {
          res.render("grossIncome", {grossIncome: foundgrossIncome});
      }
  });
});

router.delete('/:id', middleware.isLoggedIn, function(req, res){
   grossIncome.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/dashboard');
        } else {
            res.redirect('/grossIncome');
        }
    });    
}); 

router.get('/:id/edit', middleware.isLoggedIn, function(req, res){
    grossIncome.findById(req.params.id, function(err, foundgrossIncome){
        if(err) {
            console.log(err);
        } else {
        res.render('grossIncome/edit', {grossIncome: foundgrossIncome});
        }
    });
});

router.put('/:id', middleware.isLoggedIn, function(req, res){
    grossIncome.findByIdAndUpdate(req.params.id, req.body, function(err, updatedgrossIncome){
        if(err){
            res.redirect('err');
        } else {
            res.redirect('/dashboard');
        }
    });    
});

module.exports = router;
