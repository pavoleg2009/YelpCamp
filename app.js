var express       = require("express");
var app           = express();
var bodyParser    = require("body-parser");
var mongoose          = require("mongoose");
var passport          = require("passport");
var LocalStrategy     = require("passport-local");
var methodOverride    = require("method-override");
var flash             = require("connect-flash");

var Campground        = require("./models/campground");
var Comment           = require("./models/comment");
var User              = require("./models/user");
var seedDB            = require("./seeds");

var commentRoutes     = require("./routes/comments");
var campgroundRoutes  = require("./routes/campgrounds");
var indexRoutes       = require("./routes/index");

//seedDB(); // clear and fill DB with test data

//==========================
// PASSPORT CONFIGURATION
//==========================

app.use(require("express-session")({
  secret:"String used to encpriotion",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//==========================
// DB CONNECT
//==========================

console.log("process.env.DATABASEURL = " + process.env.DATABASEURL);
//mongoose.connect(process.env.DATABASEURL);
// c9 connection
mongoose.connect("mongodb://localhost/yelp_camp"); // local c9 db
// mongod connection
//mongoose.connect("mongodb://oleg:123@ds035438.mlab.com:35438/yelpcamp");

//==========================
// APP CONFIG
//==========================

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

//================================
// ROUTERS
//================================

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

//================================
// LISTENER
//================================

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("The YelpCamp Server Started");
});