var app = angular.module("NagMe", []);

//need to access ajax service which is HTTP in angular
app.controller("UsersController", ["$http", function($http){
	//make ajax request to server||users.js(controller)
	//users.js(controller) makes request to mongo DB
	//mongo DB accesses json data which feeds the UsersController
	//wherever UsersController lives, json data will be console.logged
	$http.get("/users/json").then(
		//success
		function(data){
			console.log(data)
		},
		//failure
		function(error){
			console.log(error)
		}
	)
}]);