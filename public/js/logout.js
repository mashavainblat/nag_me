var app = angular.module("logout-directive", ["LogoutController"])

app.directive("logoutDirective", function(){
	return{
		restrict: "E",
		templateUrl: "views/logout.html",
		controller: "LogoutController",
		controllerAs: "logoutCtrl"
	}
})