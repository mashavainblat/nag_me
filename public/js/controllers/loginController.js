var app = angular.module("LoginController", ["ngCookies"])

app.controller("LoginController", ["$scope", "$http", "$cookies", function($scope, $http, $cookies){

	var self = this;
	this.user = {};
	this.user.loggedIn = false;

	var cookies = $cookies.getAll();

	if (cookies.userFirstName && cookies.userLastName && cookies.userEmail && cookies.userPhoneNumber){
		self.user = {
			firstName: cookies.userFirstName,
			lastName: cookies.userLastName,
			email: cookies.userEmail,
			password: cookies.userPassword,
			phoneNumber: cookies.userPhoneNumber,
			list: cookies.userList,
			loggedIn: true
		};
	};

	this.login = function(data){
		$http({
			method: "POST",
			url: "/users/login",
			data: this
		}).then(
			function(response){
				console.log(response)
				var cookies = $cookies.getAll();
				self.user = {
					firstName: cookies.userFirstName,
					lastName: cookies.userLastName,
					email: cookies.userEmail,
					phoneNumber: cookies.userPhoneNumber,
					list: cookies.userList
				};
				if (cookies.userEmail != null){
					self.user.loggedIn = true
				};
			},
			function(error){
				console.log(error)
			}
		)
	}

	$scope.$on("user-signed-up", function(eventObj, data){
		self.user = data;
	});

	$scope.$on("user-logged-out", function(eventObj, data){
		self.user = {};
		self.user.loggedIn = false;
	});

}])