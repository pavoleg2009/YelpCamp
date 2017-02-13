// Campgound routes

var express         = require("express");
var router          = express.Router();
var Campground      = require("../models/campground");
var Comment         = require("../models/comment");
var middleware      = require("../middleware/index.js");

// INDEX - show all campgrounds
router.get("/", function(req, res){
  //Get all campgrounds from DB
  Campground.find({}, function(err, campgrounds){
    if(err){
      console.log("err");
    } else {
      res.render("campgrounds/index",{campgrounds: campgrounds, currentUser: req.user});
    }
  });
});

// NEW - show form to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("campgrounds/new");
});

// CREATE - post new campgroun to DB
router.post("/", middleware.isLoggedIn, function(req, res){
  //get data from form and add to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newCampground = { name: name,
                        image: image, 
                        description: description,
                        author: author
  };
  //create a new campground and save to DB
  Campground.create(newCampground, function(err, newCampground){
    if(err){
      console.log(err);
    } else {
      //redirect back to campgrounds page
      res.redirect("/campgrounds");
    }
  });
});

// SHOW - shows more info about camground must be under other /campgrounds/new"
router.get("/:id", function(req, res){
  //find the compground with provided ID
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      //render show template with that ID      //r
      res.render("campgrounds/show",{campground: foundCampground});
    }
  });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){  
        res.render("campgrounds/edit",{campground: foundCampground});
    });    
});
// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req,res){
  //find and update campground
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    if(err){
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds/"+req.params.id);
    }
  });
  //redirect to show page
});

// DESTROY (DELETE) CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

module.exports = router;