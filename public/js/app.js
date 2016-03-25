var app = angular.module("NagMe", []);

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
			console.log(response.data)
		},
		//failure
		function(error){
			console.log(error)
		}
	)
}]);

app.controller("FormController", ["$http", function($http){
	var self = this;
	this.create = function(){
		console.log(this)
	}
}])