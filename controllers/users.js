var express = require("express");
var router = express.Router();
var User = require("../models/user.js");
var passport = require("passport");

router.get("/json", function(req, res){
	// console.log("users controller")
	//ACCESSES DATABASE
	User.find({}, function(err, users){
		//feeds the view
		res.json(users);
	});
});

//CREATE USER
//================================
// SIGNUP
//================================

//POST
router.post("/signup", passport.authenticate("local-signup", 
	{failureRedirect: "/"}), 
	function(req, res){
		console.log(req.user)
		res.json({success: true});
	}
);

//================================
// LOGIN
//================================
router.post("/login", passport.authenticate("local-login", 
	{failureMessage: "fail"}), 
	function(req, res){
		console.log('User is logged in as: ', req.user);
		res.json(req.user)
	}
)


//================================
// LOGOUT
//================================
router.get("/logout", function(req, res){
	console.log('This is the user: ', req.user);
	req.logout();
	res.json({success: true});
});


//CREATE
router.post("/addListItem", function(req, res){
	console.log('AddListItem req.body: ', req.body);
	console.log('The user is: ', req.user);
	// User.findById(req.user.id, function() {
		
	// })
	res.send(req.body);
	// console.log(User)
});



//route middleware to make sure a user is logged in
function isLoggedIn(req, res, next){
	//if user is authenticated in the session, carry on
	if (req.isAuthenticated()){
		return next();
	}
	//else, redirect to home
	res.redirect("/");
}

module.exports = router;