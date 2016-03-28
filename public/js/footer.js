var app = angular.module("footer-directive", ["FooterController"])

app.directive("footerDirective", function(){
	return{
		restrict: "E",
		templateUrl: "views/footer.html",
		controller: "FooterController",
		controllerAs: "footerCtrl"
	}
})