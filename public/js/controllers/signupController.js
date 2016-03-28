var app = angular.module("SignupController", []);

app.controller("SignupController", ["$http", function($http){
	this.testSignup = "SIGNUP"

	var self = this;

	$http.get("/users/json").then(
		//success
		function(response){
			self.users = response.data
			// console.log(response.data)
		},
		//failure
		function(error){
			console.log(error)
		}//closes .then
	)//closes $http.get

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
				console.log(response)
			},
			//failure
			function(error){
				console.log(error)
			}
		)//closes .then
	}//closes .create()

}])