var app = angular.module("LogoutController", []);

app.controller("LogoutController", ["$http", "$scope", function($http, $scope){
	this.testLogout = "LOGOUT"
	var self = this;
	this.user = {}
	this.user.loggedIn = false;

	this.logout = function(){
		$http.get("/users/logout").then(
			function(response){
				console.log(response)
				self.user = {};
				// self.user.loggedIn = false;
				$scope.$emit("user-logged-out", self.user)
			},
			function(error){
				console.log(error)
			}
		);
	}; //ends logout()
}])