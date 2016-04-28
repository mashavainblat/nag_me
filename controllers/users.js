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
		console.log("User phoneNumber: ", req.user.phoneNumber)
		// console.log("=======================================")
		client.sendMessage({
			to: "+1" + req.user.phoneNumber,
			from: "+16313378288",
			body: "Hello " + req.user.firstName + ". Thank you for signing up. Please tell us what you would like to be nagged about."
			//body: "Hey, you wanted to be nagged about " + req.params.listItemName + ". http://localhost:3000/users/done/" + req.params.listId + "/" + listItemName
			
			// body: "Hey, you wanted to be nagged about " + req.params.listItemName + ". http://nag-me.herokuapp.com/users/done/" + req.params.listId + "/" + req.params.listItemName
		}, function(err, data){
			if(err){
				console.log("error: ", err);
			} else {
			// console.log("data: ", data);
			}
		})
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
	// console.log("=======================================")
	// console.log('This is the logged out user: ', req.user);
	// console.log("=======================================")
	req.logout();
	res.json({success: true});
});

//changes listItem status to complete once user has clicked on link
router.get("/done/:listId/:listItemName", function(req, res){
	// res.send("Done route will change status to 'complete'");
	// console.log("The user is(req.user): ", req.user)
	// User.findById(req.user.id, function(error, user){
	var listItemName = req.params.listItemName
	console.log("listItemName: ", listItemName)
	var listItemName = listItemName.replace(/ /g, "+")
	console.log("listItemName: ", listItemName)

	List.findById(req.params.listId, function(error, data){
		// console.log("data: ", data);
		console.log("data: ", data)		
		if (data._id == req.params.listId){
			console.log("req.params.listId: ", req.params.listId)
			data.status = "complete"
			data.save(function(error, updatedListItem){
				res.redirect("https://www.google.com/?gws_rd=ssl#q=" + listItemName)
			})
		}
		// for (var i = 0; i<data.list.length; i++){
		// 	if (data.list[i].id == req.params.listId){
		// 		// console.log("req.params.listId: ", req.params.listId);
		// 		// console.log("data.list[i].status: ", data.list[i].status)
		// 		data.list[i].status = "complete";
		// 		// console.log("data.list[i].status: ", data.list[i].status)
		// 		data.save(function(error, updatedData){
		// 			console.log("updatedData: ", updatedData)
		// 			res.redirect("https://www.google.com/?gws_rd=ssl#q=" + req.params.listItemName)
		// 			// res.json(updatedData)
		// 		})
		// 	}
		// }
	})
}); //ends router.put


router.get("/admin/nag/:listId/:listItemName", function(req, res){
	
	var listItemName = req.params.listItemName

	User.findById(req.user.id, function(error, user){
		// console.log("user: ", user);
		// console.log("user.phoneNumber: ", user.phoneNumber)
		for (var i = 0; i<user.list.length; i++){		
			if (user.list[i].id == req.params.listId){
				user.list[i].status = "pending";
				user.save(function(error, updatedUser){
					// console.log("updatedUser: ", updatedUser)

					client.sendMessage({
						to: "+1" + updatedUser.phoneNumber,
						from: "+16313378288",
						body: "Hey, you wanted to be nagged about " + req.params.listItemName + ". http://localhost:3000/users/done/" + req.params.listId + "/" + listItemName
						
						// body: "Hey, you wanted to be nagged about " + req.params.listItemName + ". http://nag-me.herokuapp.com/users/done/" + req.params.listId + "/" + req.params.listItemName
					}, function(err, data){
						if(err){
							console.log("error: ", err);
						} else {
						// console.log("data: ", data);
						}
					})
					res.json(updatedUser)
				})
			}
		}
	})
	// List.find({status: "active"}, function(error, listData){
	// 	// console.log("listData: ", listData)
	// 	for(var i = 0; i<1; i++){
	// 		if(listData[i].status == "active"){

	// 			// console.log("listData["+i+"]: ", listData[i])
	// 			listData[i].status = "pending";
	// 			// console.log(listData[i].status)

	// 			listData[i].save(function(error, updatedList){
	// 				// console.log("updatedList: ", updatedList)
	// 				client.sendMessage({
	// 					to: "+15162344611",
	// 					from: "+16313378288",
	// 					body: "Hey, you wanted to be nagged about " + listData[i].listItem + ". http://localhost:3000/users/done/" + listData[i]._id + "/" + listData[i].listItem
						
	// 					// body: "Hey, you wanted to be nagged about " + req.params.listItemName + ". http://nag-me.herokuapp.com/users/done/" + req.params.listId + "/" + req.params.listItemName
	// 				}, function(err, data){
	// 					if(err){
	// 						// console.log("error: ", err);
	// 					} else {
	// 					// console.log("data: ", data);
	// 					}
	// 				})
	// 				res.json(updatedList)
	// 			})
	// 		}
	// 	}
	// })
})

// url param key?

router.get("/admin/reset-pending-status", function(req, res){
	// res.send("Gotta nag about some stuff");
	User.findById(req.user.id, function(error, user){
		// console.log("user: ", user);
		// console.log("user.phoneNumber: ", user.phoneNumber)
		for (var i = 0; i<user.list.length; i++){		
			if (user.list[i].id == req.params.listId){
				user.list[i].status = "active";
				user.save(function(error, updatedUser){
					console.log("updatedUser: ", updatedUser)
					res.json(updatedUser)
				})
			}
		}
	})
})



//CREATE
router.post("/addListItem/", isLoggedIn, function(req, res){
		User.findById(req.user.id, function(err, user) {
			if (err) { 
				console.log('The error is: ', err);
				throw err; 
			}
			var newListItem = new List({
				listItem: req.body.listItem,
				status: "active"
			})

			console.log("=============================")
			console.log("newListItem: ", newListItem)
			console.log("=============================")
			newListItem.save(function(err, listData) {
				// console.log("listData: ", listData)
				user.list.push(listData);
				user.save(function(err, updatedUser) {
					// console.log("updatedUser.phoneNumber: ", updatedUser.phoneNumber)
					// console.log("updatedUser: ", updatedUser)
					console.log("=============================")
					console.log("newListItem.listItem: ", newListItem.listItem)
					console.log("=============================")
						client.sendMessage({
							to: "+1" + updatedUser.phoneNumber,
							from: "+16313378288",
							body: "Hi " + updatedUser.firstName + ". You wanted to be nagged about " + newListItem.listItem + ". Click here: https://www.google.com/?gws_rd=ssl#q=" + newListItem.listItem
						}, function(err, data){
							if(err){
								console.log("error: ", err);
							} else {
							// console.log("data: ", data);
							}
						})
					res.json(updatedUser);
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