var app = angular.module("LoginController", [])

app.controller("LoginController", ["$scope", "$http", function($scope, $http){

	var self = this;
	this.user = {};
	this.user.loggedIn = false;

	this.login = function(data){
		$http({
			method: "POST",
			url: "/users/login",
			data: this
		}).then(
			function(response){
				// console.log(response.data)
				self.user = response.data
				// console.log("the user is: ", self.user)
				$scope.$emit("user-logged-in", self.user)
			},
			function(error){
				console.log(error)
			}
		)
	}


}])