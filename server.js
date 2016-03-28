var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var passport = require("passport");
var session = require("express-session");

mongoose.connect("mongodb://localhost:27017/nagme")

//MIDDLEWARE

app.use(express.static("public"));
// app.use(bodyParser.urlencoded({extended:true}));
//for all incoming urls
//can expect json data
app.use(bodyParser.json());

require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());

//CONTROLLERS
var usersController = require("./controllers/users.js");
app.use("/users", usersController)

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