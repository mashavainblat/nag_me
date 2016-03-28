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
router.post("/", passport.authenticate("local-signup", 
	{failureRedirect: "/"}), 
	function(req, res){
	// res.send(req.body)
		// var newUser = new User(req.body);
		res.cookie("userid", req.user.id);
		res.cookie("userFirstName", req.user.firstName);
		res.cookie("userLastName", req.user.lastName);
		res.cookie("userEmail", req.user.Email);
		res.cookie("userPhoneNumber", req.user.phoneNumber);

		// console.log(newUser)
		// newUser.save(function(error, data){
		console.log(req.user)
		res.json({success: true});
		// })
	}
);

module.exports = router;