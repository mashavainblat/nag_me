var app = angular.module("SignupController", []);

app.controller("SignupController", ["$http", "$scope", function($http, $scope){
	this.testSignup = "SIGNUP"

	var self = this;
	this.user = {};
	this.user.loggedIn = false;

	//called on ng-submit
	//when form data submits... 
	this.signup = function(user){
		// console.log(this)
		// make http ajax call to /users/json
		//method post and pass in data
		$http({
			method: "POST",
			//post to this url route
			url: "/users/signup",
			//since this is json data format...
			//have to tell server to user body parser on json data
			data: this //data is making it to the server
		}).then(
			//success
			function(response){
				self.user = response.data
				// console.log("the signed up user is: ", self.user)
				$scope.$emit("user-signed-up", self.user)
			},
			//failure
			function(error){
				console.log(error)
			}
		)//closes .then
	}//closes .create()

	$scope.$on("user-logged-in", function(eventObj, data){
		self.user = data;
	})

	$scope.$on("user-logged-out", function(eventObj, data){
		self.user = {};
		self.user.loggedIn = false;
	})

}])