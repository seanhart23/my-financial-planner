var express = require('express');
var router = express.Router();
var budgetExpense = require('../models/budgetExpense');
var budgetItem = require('../models/budgetItem');
var middleware = require('../middleware');

router.get('/', function(req, res){
        budgetExpense.find({}, function(err, allBudgetExpense){
        if(err){
            console.log(err);
        } else {
            res.render("budgetExpense", {budgetExpense: allBudgetExpense});      
        }
    });
});

router.post('/', middleware.isLoggedIn, function(req, res){
    var expense = req.body.expense;
    var date = req.body.date;
    var amount = req.body.amount;
    var category = req.body.category;
    var type = req.body.type;
     var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newBudgetExpense = {expense: expense, amount: amount, date: date, author: author, category: category, type: type};
    budgetExpense.create(newBudgetExpense, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/budget");
        }
    });
});

router.get('/new', function(req, res){
            budgetItem.find({}, function(err, allBudgetItems){
        if(err){
            console.log(err);
        } else {
            res.render("budgetExpense/new", {budgetItem: allBudgetItems});      
        }
    });
});

router.get('/:id/edit', function(req, res){
    budgetExpense.findById(req.params.id, function(err, foundBudgetExpense){
    budgetItem.find({}, function(err, allBudgetItems){
        if(err) {
            console.log(err);
        } else {
        res.render('budgetExpense/edit', {budgetExpense: foundBudgetExpense, budgetItem: allBudgetItems});
        }
    });
    });
});

router.put('/:id', function(req, res){
    budgetExpense.findByIdAndUpdate(req.params.id, req.body, function(err, updatedExpense){
        if(err){
            res.redirect('/budget');
        } else {
            res.redirect('/budget');
        }
    });    
});

router.delete('/:id',function(req, res){
   budgetExpense.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/budget');
        } else {
            res.redirect('/budget');
        }
    });    
}); 

module.exports = router;