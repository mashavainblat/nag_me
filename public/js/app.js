(function(){


var app = angular.module("NagMe", ["header-directive", "signup-directive", "login-directive", "list-directive", "logout-directive", "ngCookies"]);

//need to access ajax service which is HTTP in angular
app.controller("BodyController", ["$http", "$scope", "$cookies", function($http, $scope, $cookies){
	var self = this;

	this.user = {};
	this.user.loggedIn = false;

	var cookies = $cookies.getAll();
	console.log(cookies)

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

	//make ajax request to server||users.js(controller)
	//users.js(controller) makes request to mongo DB
	//mongo DB accesses json data which feeds the UsersController
	//wherever UsersController lives, json data will be console.logged
}])

})(); //ends window onload function