var express = require("express");
var router = express.Router();
var User = require("../models/user.js");

router.get("/", function(req, res){
	console.log("users controller")
	res.send("Users");
	var newUser = new User({
		firstName: "Miriam",
		lastName: "Vainblat",
		email: "miriam@gmail.com",
		password: "miriam",
		phoneNumber: "+5162321815"
	});
	newUser.save(function(err, data){
		console.log("Miriam is saved")
	})
})

module.exports = router;