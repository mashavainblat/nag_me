var app = angular.module("SignupController", ["ngCookies"]);

app.controller("SignupController", ["$http", "$scope", "$cookies", function($http, $scope, $cookies){
	this.testSignup = "SIGNUP"

	var self = this;
	this.user = {};
	this.user.loggedIn = false;

	//get all local cookies
	var cookies = $cookies.getAll();

	//determine if user has cookies that would signal if they're logged in
	//if so, create user object with their info
	if (cookies.userFirstname && cookies.userLastName && cookies.userEmail && cookies.userPhoneNumber){
		self.user = {
			firstName: cookies.userFirstName,
			lastName: cookies.userLastName,
			email: cookies.userEmail,
			password: cookies.userPassword,
			phoneNumber: cookies.userPhoneNumber,
			loggedIn: true
		};
	};

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
				console.log(response)
				console.log(self)
				var cookies = $cookies.getAll();
				self.user = {
					firstName: cookies.userFirstName,
					lastName: cookies.userLastName,
					email: cookies.userEmail,
					phoneNumber: cookies.userPhoneNumber
				};
				if (cookies.userFirstName != null) {
					self.user.loggedIn = true
				};
				$scope.$emit("user-signed-up", self.user);
				console.log(self.user)
			},
			//failure
			function(error){
				console.log(error)
			}
		)//closes .then
	}//closes .create()

}])