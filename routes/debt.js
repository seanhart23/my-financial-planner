var express = require('express');
var router = express.Router();
var debt = require('../models/debt');
var startingDebt = require('../models/startingDebt');
var grossIncome = require('../models/grossIncome');
var middleware = require('../middleware');

router.get('/', middleware.isLoggedIn, function(req, res){
    debt.find({}, function(err, allDebts){
        startingDebt.find({}, function(err, allstartingDebts){
            grossIncome.find({}, function(err, allgrossIncome){
            if(err){
                console.log(err);
            } else {
                res.render("debt", {debt: allDebts, startingDebt: allstartingDebts, grossIncome: allgrossIncome});
            }
        });
    });
});
});


router.post('/', middleware.isLoggedIn, function(req, res){
    var itemLabel = req.body.itemLabel;
    var type = req.body.type;
    var amount = req.body.amount;
    var last_update = req.body.last_update;
    var interestRate = req.body.interestRate;
    var monthlyPayment = req.body.monthlyPayment;
    var dueDate = req.body.dueDate;
    var website = req.body.website;
    var authUser = req.body.authUser;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newDebt = {last_update: last_update, itemLabel: itemLabel, type: type, amount: amount, interestRate: interestRate, monthlyPayment: monthlyPayment, dueDate: dueDate, website: website, author: author, authUser: authUser};
    debt.create(newDebt, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/debt");
        }
    });
});

router.get('/new', middleware.isLoggedIn, function(req, res){
   res.render('debt/new');
});

router.get("/:id", middleware.isLoggedIn, function(req, res){
  debt.findById(req.params.id, function(err, foundDebt){
      if(err){
          console.log(err);
      } else {
          res.render("debt", {debt: foundDebt});
      }
  });
});

router.delete('/:id', middleware.isLoggedIn, function(req, res){
   debt.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/debt');
        } else {
            res.redirect('/debt');
        }
    });    
}); 

router.get('/:id/edit', middleware.isLoggedIn, function(req, res){
    debt.findById(req.params.id, function(err, foundDebt){
        if(err) {
            console.log(err);
        } else {
        res.render('debt/edit', {debt: foundDebt});
        }
    });
});

router.get('/:id/edit', middleware.isLoggedIn, function(req, res){
    startingDebt.findById(req.params.id, function(err, foundstartingDebt){
        if(err) {
            console.log(err);
        } else {
        res.render('debt/edit', {startingDebt: foundstartingDebt});
        }
    });
});

router.put('/:id', middleware.isLoggedIn, function(req, res){
    debt.findByIdAndUpdate(req.params.id, req.body, function(err, updatedDebt){
        if(err){
            res.redirect('err');
        } else {
            res.redirect('/dashboard');
        }
    });    
});

router.put('/:id', middleware.isLoggedIn, function(req, res){
    grossIncome.findByIdAndUpdate(req.params.id, req.body, function(err, updatedDebt){
        if(err){
            res.redirect('err');
        } else {
            res.redirect('/dashboard');
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
