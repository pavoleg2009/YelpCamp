var express         = require("express");
var router          = express.Router({mergeParams:true})
var Campground      = require("../models/campground");
var Comment         = require("../models/comment");
var middleware      = require("../middleware/index.js");

//================================
//      COMMENTs ROUTES 
//================================

// comments new
router.get("/new", middleware.isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  })
})

// create comments
router.post("/", middleware.isLoggedIn, function(req, res){
  // lookup Campground usting ID
  Campground.findById(req.params.id, function(err, campground){
    if(err){
        console.log(err);
        res.redirect("/campgrounds")
    } else {
      // create new comment
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err);
        } else {
          //add username and ID to comment
        comment.author.id = req.user.id;
        comment.author.username = req.user.username;
        // connect new comment to campground 
        comment.save()
        campground.comments.push(comment);
        campground.save();
         req.flash("success", "Successfully added comment");
        res.redirect('/campgrounds/' + campground._id);
        }
      });
    }
  })
})

// Edit comment route
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err) {
      res.redirect("back");
    } else {
      res.render("comments/edit", {campground_id: req.params.id, comment: foundComment})
    }
  })
});

//Update comment route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err){
      res.redirect("back")
    } else {
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

//Delete comment
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
  //find by id and remove
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
      res.redirect("back");
    } else {
      req.flash("success", "Comment deleted");
      res.redirect("/campgrounds/"+req.params.id);
    }
      
  })
});

module.exports = router;