var app = angular.module("LogoutController", ["ngCookies"]);

app.controller("LogoutController", ["$http", "$cookies", "$scope", function($http, $cookies, $scope){
	this.testLogout = "LOGOUT"
	var self = this;
	this.user = {}
	this.user.loggedIn = false;

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

	this.logout = function(){
		$http.get("/users/logout").then(
			function(response){
				console.log(response)
				self.user = {};
				self.user.loggedIn = false;
			},
			function(error){
				console.log(error)
			}
		);
	}; //ends logout()
}])