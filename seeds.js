var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")

var data = [
  { name: "Empty Forest",
    image: "https://farm7.staticflickr.com/6188/6106475454_cf4dab4d64.jpg",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
  },
  { name: "On the Shore",
    image: "https://farm8.staticflickr.com/7168/6670258309_2e52bdbc6c.jpg",
    description: "but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  },
  { name: "Laky",
    image: "https://farm9.staticflickr.com/8618/16684264666_159e352cc0.jpg",
    description: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters"
  },
  { name: "Salmon Creeck",
    image:"https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
    description: "It is a"
  },
  { name: "Granite Hill",
    image:"https://farm8.staticflickr.com/7258/7121861565_3f4957acb1.jpg",
    description: "It is b"    
  },
  { name: "Mountain Goat's Rest",
    image:"https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg",
    description: "It is c"    
  }
];

function seedDB(){
  // Remove all campgrounds
  Campground.remove({}, function(err){
    if(err){
      console.log(err)
    } else {
      
      console.log("removed campground!");
      //Add campgrounds
      // data.forEach(function(seed){
      //   Campground.create(seed,function(err, campground){
      //     if(err){
      //       console.log(err)
      //     } else {
      //       console.log("added a campground");

      //       Comment.create({
      //         text: "The place is great, but I wish there was internet",
      //         author: "Homer"
      //       }, function(err, comment){
      //         if(err){
      //           console.log(err)
      //         } else {

      //           campground.comments.push(comment);
      //           campground.save();
      //           console.log("Created new coment");
      //         };  
      //       });
      //     }
      //   })
      // });
    }  
  });
};

module.exports = seedDB;