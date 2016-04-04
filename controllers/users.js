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
		// console.log("=======================================")
		// console.log("User is signed in as: ", req.user)
		// console.log("=======================================")
		res.json(req.user);

	}
);

//================================
// LOGIN
//================================
router.post("/login", passport.authenticate("local-login", 
	{failureMessage: "fail"}), 
	function(req, res){
		// console.log("=======================================")
		// console.log('User is logged in as: ', req.user);
		// console.log("=======================================")
		res.json(req.user)
	}
)


//================================
// LOGOUT
//================================
router.get("/logout", function(req, res){
	// console.log("=======================================")
	// console.log('This is the logged out user: ', req.user);
	// console.log("=======================================")
	req.logout();
	res.json({success: true});
});


// router.get("/admin/nag", function(req, res){
// 	res.send("testing")
// 	console.log("testing")
// 	User.findById(req.user.id, function(error, user){
// 		console.log("user: ", user)
// 	})
// })

// test id: 56fc23b9fcb8b94f066011e8
// test listId: 570282764c474599045fcc04
// test listItemName: tank

router.put("/done/:listId/:listItemName", function(req, res){
	res.send("Done route will change status to complete")
	console.log("req.user: ", req.user)

	User.findByIdAndUpdate(req.params.listId, 
		{"$set": {"status.$": "complete"}},
		function(error, user){
			console.log("user: ", user)
			console.log("user.status: ", user.status)
			res.json(user)
		})
})


//CREATE
router.post("/addListItem/", isLoggedIn, function(req, res){
		User.findById(req.user.id, function(err, user) {
			if (err) { 
				console.log('The error is: ', err);
				throw err; 
			}
			console.log("user: ", user)
			console.log("req.body.listItem: ", req.body.listItem)
			console.log("req.body.status: ", req.body.status)
			// var newListItem = new List(req.body);
			var newListItem = new List({
				listItem: req.body.listItem,
				status: "active"
			})

			console.log("newListItem: ", newListItem)
			// res.json(user)
			newListItem.save(function(err, listData) {
				// console.log("listData: ", listData)
				user.list.push(listData);
				user.save(function(err, updatedUser) {
					// console.log("updatedUser.phoneNumber: ", updatedUser.phoneNumber)
					// console.log("updatedUser: ", updatedUser)
					// console.log("newListItem.listItem: ", newListItem.listItem)
						// client.sendMessage({
						// 	to: "+1" + updatedUser.phoneNumber,
						// 	from: "+16313378288",
						// 	body: "https://www.google.com/?gws_rd=ssl#q=" + newListItem.listItem
						// }, function(err, data){
						// 	if(err){
						// 		console.log("error: ", err);
						// 	} else {
						// 	// console.log("data: ", data);
						// 	}
						// })
					res.json(updatedUser);
					console.log("=======================");
					console.log("redirecting to new route");
					console.log("=======================");
					// res.redirect("/admin/nag")
				}); //ends user.save
			});	//ends newListItem.save
		}); //ends User.findById
}); //ends router.post("/addListItem")



//DELETE
router.delete("/deleteListItem/:list_id", function(req, res){
	var listId = req.params.list_id
	console.log("========================")
	console.log("deleting")
	console.log("========================")
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