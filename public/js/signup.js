var app = angular.module("signup-directive", ["SignupController"])

app.directive("signupDirective", function(){
	return{
		restrict: "E",
		templateUrl: "views/signup.html",
		controller: "SignupController",
		controllerAs: "signupCtrl"
	};
})