var express = require("express");
var router = express.Router();
var User = require("../models/user.js");

router.get("/json", function(req, res){
	console.log("users controller")
	//ACCESSES DATABASE
	User.find({}, function(err, users){
		//feeds the view
		res.json(users);
	});
});

module.exports = router;

	// res.send("Users");
	// var newUser = new User({
	// 	firstName: "Miriam",
	// 	lastName: "Vainblat",
	// 	email: "miriam@gmail.com",
	// 	password: "miriam",
	// 	phoneNumber: "+5162321815"
	// });
	// newUser.save(function(err, data){
	// 	console.log("Miriam is saved")
	// })