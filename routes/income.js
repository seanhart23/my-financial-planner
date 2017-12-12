var express = require('express');
var router = express.Router();
var income = require('../models/income');

router.get('/', function(req, res){
        income.find({}, function(err, allIncome){
        if(err){
            console.log(err);
        } else {
            res.render("income/index", {income: allIncome});      
        }
    });
});

router.post('/', function(req, res){
    var source = req.body.source;
    var amount = req.body.amount;
    var newIncome = {source: source, amount: amount};
    income.create(newIncome, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/income");
        }
    });
});

router.get('/new', function(req, res){
   res.render('income/new');
});

router.get("/:id", function(req, res){
  income.findById(req.params.id, function(err, foundIncome){
      if(err){
          console.log(err);
      } else {
          res.render("income/show", {income: foundIncome});
      }
  });
});

router.delete('/:id', function(req, res){
   income.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/income');
        } else {
            res.redirect('/income');
        }
    });    
}); 

router.get('/:id/edit', function(req, res){
    income.findById(req.params.id, function(err, foundIncome){
        if(err) {
            console.log(err);
        } else {
        res.render('income/edit', {income: foundIncome});
        }
    });
});

router.put('/:id', function(req, res){
    income.findByIdAndUpdate(req.params.id, req.body.income, function(err, updatedIncome){
        if(err){
            res.redirect('/income');
        } else {
            console.log(req.body.income);
            res.redirect('/income/' + req.params.id);
        }
    });    
});

module.exports = router;
