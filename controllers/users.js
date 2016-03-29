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
		res.cookie("userid", req.user.id);
		res.cookie("userFirstName", req.user.firstName);
		res.cookie("userLastName", req.user.lastName);
		res.cookie("userEmail", req.user.email);
		res.cookie("userPhoneNumber", req.user.phoneNumber);
		res.cookie("userList", req.user.list);
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
		res.cookie("userid", req.user.id);
		res.cookie("userFirstName", req.user.firstName);
		res.cookie("userLastName", req.user.lastName);
		res.cookie("userEmail", req.user.email);
		res.cookie("userPhoneNumber", req.user.phoneNumber);
		res.cookie("userList", req.user.list);
		console.log(req.user)
		res.json(req.user)
	}
)


//================================
// LOGOUT
//================================
router.get("/logout", function(req, res){
	req.logout();
	res.clearCookie("userid");
	res.clearCookie("userFirstName");
	res.clearCookie("userLastName");
	res.clearCookie("userEmail");
	res.clearCookie("userPhoneNumber");
	res.clearCookie("userList");
	res.json({success: true})
});


//CREATE
router.post("/addListItem", function(req, res){
	console.log(req.body)
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