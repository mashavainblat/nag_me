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

//POST
router.post("/", function(req, res){
	// res.send(req.body)
	var newUser = new User(req.body);
	console.log(newUser)
	newUser.save(function(error, data){
		res.send(data)
	})

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