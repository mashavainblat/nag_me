var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var client = require("twilio")(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

var passport = require("passport");
var session = require("express-session");
// var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/nag_me';

mongoose.connect("mongodb://localhost:27017/nagme")
// mongoose.connect(mongoUri)


//MIDDLEWARE

app.use(express.static("public"));
// app.use(bodyParser.urlencoded({extended:true}));
//for all incoming urls
//can expect json data
app.use(bodyParser.json());

require('./config/passport')(passport);

app.use(session({name: 'nag-me', secret: 'idk what I am doing'}));
app.use(passport.initialize());
app.use(passport.session());

//CONTROLLERS
var usersController = require("./controllers/users.js");
app.use("/users", usersController)

app.get("/testtwilio", function(req, res){
	client.sendMessage({
		to: "+15162344611",
		from: "+16313378288",
		body: "Hello nagging you about stuff"
	}, function(err, data){
		if(err){
			console.log("error: ", err);
		} else {
		console.log("data: ", data);
		}
	})
})


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