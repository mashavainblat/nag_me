var app = angular.module("login-directive", ["LoginController"])

app.directive("loginDirective", function(){
	return{
		restrict: "E",
		templateUrl: "views/login.html",
		controller: "LoginController",
		controllerAs: "loginCtrl"
	};
})