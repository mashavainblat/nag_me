(function(){


var app = angular.module("NagMe", ["header-directive", "signup-directive", "login-directive", "list-directive", "logout-directive"]);

//need to access ajax service which is HTTP in angular
app.controller("BodyController", ["$http", "$scope", function($http, $scope){
	var self = this;

	this.user = {};
	this.user.loggedIn = false;

	//make ajax request to server||users.js(controller)
	//users.js(controller) makes request to mongo DB
	//mongo DB accesses json data which feeds the UsersController
	//wherever UsersController lives, json data will be console.logged
}])

})(); //ends window onload function