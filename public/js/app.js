(function(){


var app = angular.module("NagMe", ["header-directive", "signup-directive", "login-directive", "list-directive", "logout-directive"]);

//need to access ajax service which is HTTP in angular
app.controller("BodyController", ["$http", "$scope", function($http, $scope){
	var self = this;

	this.user = {};
	this.user.loggedIn = false;

	$scope.$on("user-logged-in", function(eventObj, data){
		self.user = data;
		console.log("user-logged-in self.user: ", self.user)
	})

	$scope.$on("user-signed-up", function(eventObj, data){
		self.user = data;
		console.log("user-signed-up self.user: ", self.user)
	})

	$scope.$on("user-logged-out", function(eventObj, data){
		self.user = data
		self.user.loggedIn = false;
		console.log("user-logged-out: ", self.user)
	})

	this.signupForm = true;
	this.loginForm = false;
	this.showSignUpForm = function(){
		console.log("clicking Signup")
		this.signupForm = false
		this.loginForm = true
	}

	this.showLoginForm = function(){
		console.log("clicking Login")
		this.loginForm = true
		this.signupForm = false
	}
	// this.displayForm = function(){
	// 	this.signupForm = !this.signupForm;
	// 	this.loginForm = !this.loginForm;
	// }

	//make ajax request to server||users.js(controller)
	//users.js(controller) makes request to mongo DB
	//mongo DB accesses json data which feeds the UsersController
	//wherever UsersController lives, json data will be console.logged
}])

})(); //ends window onload function