var express = require('express');
var router = express.Router();
var sb = require('../models/sb');
var middleware = require('../middleware');

router.get('/', function(req, res){
        sb.find({}, function(err, allSB){
        if(err){
            console.log(err);
        } else {
            res.render("sb", {sb: allSB});      
        }
    });
});

router.post('/', middleware.isLoggedIn, function(req, res){
    var startingBalance = req.body.startingBalance;
    var authUser = req.body.authUser;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newsb = {startingBalance: startingBalance, authUser: authUser, author: author};
    sb.create(newsb, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/debt");
        }
    });
});

router.get('/new', function(req, res){
   res.render('sb/new');
});

router.get('/:id/edit', function(req, res){
    sb.findById(req.params.id, function(err, foundSB){
        if(err) {
            console.log(err);
        } else {
        res.render('sb/edit', {sb: foundSB});
        }
    });
});

router.put('/:id', function(req, res){
    sb.findByIdAndUpdate(req.params.id, req.body, function(err, updatedItem){
        if(err){
            res.redirect('/debt');
        } else {
            res.redirect('/debt');
        }
    });    
});

router.delete('/:id',function(req, res){
   sb.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/debt');
        } else {
            res.redirect('/debt');
        }
    });    
}); 

module.exports = router;