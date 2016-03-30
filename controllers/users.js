var express = require("express");
var router = express.Router();
var passport = require("passport");

var User = require("../models/user.js");
var List = require("../models/list.js");

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
	// List.create(req.body, function(error, list){

		console.log('Req.body: ', req.body);

		console.log(req.user.id);

		User.findById(req.user.id, function(err, user) {

			if (err) { 
				console.log('The error is: ', err);
				throw err; 
			}

			var newListItem = new List(req.body);

			console.log('The new list item is: ', newListItem)

			newListItem.save(function(err, listData) {
				user.list.push(listData);
				user.save(function(err, updatedUser) {
					res.send(updatedUser);
				});
			});	
		});

		// console.log(list)
		// User.findByIdAndUpdate(req.user.id, {$push: {list:req.body.list}}, {upsert: true}, function(error, data){
		// // // User.findById(req.user.id, function(error, data){
			
		// // 	// console.log("=========================");
		// // 	// console.log("new list item: ", newListItem)
		// // 	console.log("=========================");
		// // 	console.log("data: ", data);
		// 	console.log("=========================");
		// 	console.log("req.body: ", req.body);
		// 	console.log("=========================");
		// 	console.log("req.body.list: ", req.body.list);
		// 	console.log("=========================");
		// // 	// console.log("res.user: ", req.user);
		// // 	// console.log("=========================");
		// // 	// console.log("req.body.list: ", req.body.list);
		// // 	// console.log("=========================");
		// // 	if(error){
		// // 		console.log(error)
		// // 	} else {
		// 		res.json(data)
		// // 	}
		// })
	// })
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