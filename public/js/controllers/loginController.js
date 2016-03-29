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
				console.log(response)
			},
			function(error){
				console.log(error)
			}
		)
	}

	$scope.$on("user-signed-up", function(eventObj, data){
		self.user = data;
	});

	$scope.$on("user-logged-out", function(eventObj, data){
		self.user = {};
		self.user.loggedIn = false;
	});

}])