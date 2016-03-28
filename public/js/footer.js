var app = angular.module("footer-directive", ["FooterController", "logout-directive"])

app.directive("footerDirective", function(){
	return{
		restrict: "E",
		templateUrl: "views/footer.html",
		controller: "FooterController",
		controllerAs: "footerCtrl"
	}
})