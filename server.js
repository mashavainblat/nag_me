var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

//MIDDLEWARE
app.use(express.static("public"));
// app.use(bodyParser.urlencoded({extended:true}));
//for all incoming urls
//can expect json data
app.use(bodyParser.json());

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