var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require("mongoose");

//MIDDLEWARE
app.use(express.static("public"));

//CONTROLLERS
var usersController = require("./controllers/users.js");
app.use("/users", usersController)


mongoose.connect("mongodb://localhost:27017/nagme")


//INDEX
app.get("/", function(req, res){
	res.send("Howdy")
});


mongoose.connection.once("open", function(){
	console.log("connected to mongo")
	app.listen(port, function(){
		console.log("listening on port: " + port)
	})
})