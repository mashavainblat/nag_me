var app = angular.module("list-directive", ["ListController"])

app.directive("listDirective", function(){
	return{
		restrict: "E",
		templateUrl: "views/list.html",
		controller: "ListController",
		controllerAs: "listCtrl"
	};
})