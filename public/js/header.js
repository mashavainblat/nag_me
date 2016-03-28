var app = angular.module("header-directive", ["HeaderController"])

app.directive("headerDirective", function(){
	return{
		restrict: "E",
		templateUrl: "views/header.html",
		controller: "HeaderController",
		controllerAs: "headerCtrl"
	};
})