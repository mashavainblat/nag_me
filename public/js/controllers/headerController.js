var app = angular.module("HeaderController", []);

app.controller("HeaderController", ["$http", "$scope", function($http, $scope){
	var self = this;
	// this.list = []
	this.user = {}

	this.addListItem = function(){
		$http({
			method: "POST",
			url: "/users/addListItem",
			data: this
		}).then(
			function(response){
				console.log('This is the response from the server: ', response);
			},
			function(error){
				console.log(error)
			}
		)
	}
}])