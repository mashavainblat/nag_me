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
		console.log("=======================================")
		console.log("User is signed in as: ", req.user)
		console.log("=======================================")
		res.json(req.user);

	}
);

//================================
// LOGIN
//================================
router.post("/login", passport.authenticate("local-login", 
	{failureMessage: "fail"}), 
	function(req, res){
		console.log("=======================================")
		console.log('User is logged in as: ', req.user);
		console.log("=======================================")
		res.json(req.user)
	}
)


//================================
// LOGOUT
//================================
router.get("/logout", function(req, res){
	console.log("=======================================")
	console.log('This is the logged out user: ', req.user);
	console.log("=======================================")
	req.logout();
	res.json({success: true});
});


//CREATE
router.post("/addListItem", function(req, res){
	User.findByIdAndUpdate(req.user.id, {$push: {list:req.body.list}}, {upsert:true}, function(error, data){
		if(error){
			console.log(error)
		} else {
			res.json(data)
		}
	})
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