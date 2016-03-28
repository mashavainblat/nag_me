var app = angular.module("NagMe", ["header-directive", "signup-directive", "login-directive", "list-directive", "footer-directive"]);

app.controller("BodyController", [function(){
	
}])

//need to access ajax service which is HTTP in angular
app.controller("UsersController", ["$http", function($http){
	var self = this;
	this.users = [];

	//make ajax request to server||users.js(controller)
	//users.js(controller) makes request to mongo DB
	//mongo DB accesses json data which feeds the UsersController
	//wherever UsersController lives, json data will be console.logged
	$http.get("/users/json").then(
		//success
		function(response){
			self.users = response.data
			// console.log(response.data)
		},
		//failure
		function(error){
			console.log(error)
		}
	)
}]);

app.controller("FormController", ["$http", function($http){
	var self = this;
	//called on ng-submit
	//when form data submits... 
	this.create = function(){
		// console.log(this)
		// make http ajax call to /users/json
		//method post and pass in data
		$http({
			method: "POST",
			//post to this url route
			url: "/users",
			//since this is json data format...
			//have to tell server to user body parser on json data
			data: this //data is making it to the server
		}).then(
			//success
			function(response){
				// console.log(response)
			},
			//failure
			function(error){
				console.log(error)
			}
		)
	}
}])