var express = require("express");
var router = express.Router();
var passport = require("passport");
var client = require("twilio")(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

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
router.post("/addListItem/", function(req, res){
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
						client.sendMessage({
							to: "+15162344611",
							from: "+16313378288",
							body: "http://www.google.com"
						}, function(err, data){
							if(err){
								console.log("error: ", err);
							} else {
							console.log("data: ", data);
							}
						})
					res.send(updatedUser);
				});
			});	
		});
});

//DELETE
router.delete("/deleteListItem/:list_id", function(req, res){
	var listId = req.params.list_id
	// console.log("listId: ", listId)
	console.log("========================")
	console.log("deleting")
	console.log("========================")
	// User.findById(req.user.id, function(error, data){
	// 	console.log("========================")
	// 	console.log("data: ", data)
	// 	console.log("========================")
	// 	res.json(data)
		
	// })
	User.findByIdAndUpdate(req.user.id, {$pull:{"list":{_id: listId}}}, function(error, data){
		console.log(data)
		res.json(data)
	})
})

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