var express = require('express');
var router = express.Router();
var startingDebt = require('../models/startingDebt');
var middleware = require('../middleware');

router.get('/', middleware.isLoggedIn, function(req, res){
        startingDebt.find({}, function(err, allstartingDebts){
        if(err){
            console.log(err);
        } else {
            res.render("startingDebt", {startingDebt: allstartingDebts});      
        }
    });
});

router.post('/', middleware.isLoggedIn, function(req, res){
    var amount = req.body.amount;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newstartingDebt = {amount: amount, author: author};
    startingDebt.create(newstartingDebt, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/debt");
        }
    });
});

router.get('/new', middleware.isLoggedIn, function(req, res){
   res.render('startingDebt/new');
});

router.get("/:id", middleware.isLoggedIn, function(req, res){
  startingDebt.findById(req.params.id, function(err, foundstartingDebt){
      if(err){
          console.log(err);
      } else {
          res.render("startingDebt", {startingDebt: foundstartingDebt});
      }
  });
});

router.delete('/:id', middleware.isLoggedIn, function(req, res){
   startingDebt.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/debt');
        } else {
            res.redirect('/startingDebt');
        }
    });    
}); 

router.get('/:id/edit', middleware.isLoggedIn, function(req, res){
    startingDebt.findById(req.params.id, function(err, foundstartingDebt){
        if(err) {
            console.log(err);
        } else {
        res.render('startingDebt/edit', {startingDebt: foundstartingDebt});
        }
    });
});

router.put('/:id', middleware.isLoggedIn, function(req, res){
    startingDebt.findByIdAndUpdate(req.params.id, req.body, function(err, updatedstartingDebt){
        if(err){
            res.redirect('err');
        } else {
            res.redirect('/debt');
        }
    });    
});

module.exports = router;
