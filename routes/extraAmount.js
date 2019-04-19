var express = require('express');
var router = express.Router();
var debt = require('../models/debt');
var extraAmount = require('../models/extraAmount');
var middleware = require('../middleware');

router.get('/', middleware.isLoggedIn, function(req, res){
    debt.find({}, function(err, allDebts){
        extraAmount.find({}, function(err, allextraAmounts){
            if(err){
                console.log(err);
            } else {
                res.render("snowball", {debt: allDebts, extraAmount: allextraAmounts});
            }
        });
    });
});


router.post('/', middleware.isLoggedIn, function(req, res){
    var amount = req.body.amount;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newextraAmount = {amount: amount, author: author};
    extraAmount.create(newextraAmount, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/snowball");
        }
    });
});

router.get('/new', middleware.isLoggedIn, function(req, res){
   res.render('extraAmount/new');
});

router.get("/:id", middleware.isLoggedIn, function(req, res){
  extraAmount.findById(req.params.id, function(err, foundextraAmount){
      if(err){
          console.log(err);
      } else {
          res.render("snowball", {extraAmount: foundextraAmount});
      }
  });
});

router.delete('/:id', middleware.isLoggedIn, function(req, res){
   extraAmount.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/snowball');
        } else {
            res.redirect('/snowball');
        }
    });    
}); 

router.get('/:id/edit', middleware.isLoggedIn, function(req, res){
    extraAmount.findById(req.params.id, function(err, foundextraAmount){
        if(err) {
            console.log(err);
        } else {
        res.render('extraAmount/edit', {extraAmount: foundextraAmount});
        }
    });
});

router.put('/:id', middleware.isLoggedIn, function(req, res){
    extraAmount.findByIdAndUpdate(req.params.id, req.body, function(err, updatedextraAmount){
        if(err){
            res.redirect('err');
        } else {
            res.redirect('/snowball');
        }
    });    
});

module.exports = router;
