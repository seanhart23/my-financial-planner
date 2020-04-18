var express = require('express');
var router = express.Router();
var favorites = require('../models/favorites');
var middleware = require('../middleware');

router.get('/', middleware.isLoggedIn, function(req, res){
        favorites.find({}, function(err, allfavorites){
        if(err){
            console.log(err);
        } else {
            res.render("favorites", {favorites: allfavorites});      
        }
    });
});

router.post('/', middleware.isLoggedIn, function(req, res){
    var website = req.body.website;
    var label = req.body.label;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newfavorites = {website: website, label: label, author: author};
    favorites.create(newfavorites, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/dashboard");
        }
    });
});

router.get('/new', middleware.isLoggedIn, function(req, res){
   res.render('favorites/new');
});

router.get("/:id", middleware.isLoggedIn, function(req, res){
  favorites.findById(req.params.id, function(err, foundfavorites){
      if(err){
          console.log(err);
      } else {
          res.render("favorites", {favorites: foundfavorites});
      }
  });
});

router.delete('/:id', middleware.isLoggedIn, function(req, res){
   favorites.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect('/dashboard');
        } else {
            res.redirect('/dashboard');
        }
    });    
}); 

router.get('/:id/edit', middleware.isLoggedIn, function(req, res){
    favorites.findById(req.params.id, function(err, foundfavorites){
        if(err) {
            console.log(err);
        } else {
        res.render('favorites/edit', {favorites: foundfavorites});
        }
    });
});

router.put('/:id', middleware.isLoggedIn, function(req, res){
    favorites.findByIdAndUpdate(req.params.id, req.body, function(err, updatedfavorites){
        if(err){
            res.redirect('err');
        } else {
            res.redirect('/dashboard');
        }
    });    
});

module.exports = router;
