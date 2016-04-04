var app = angular.module("HeaderController", []);

app.controller("HeaderController", ["$http", "$scope", "$routeParams", function($http, $scope, $routeParams){
	var self = this;

	this.addListItem = function(){
		console.log()
		$http({
			method: "POST",
			url: "/users/addListItem",
			data: self
		}).then(
			function(response){
				// console.log(list)
				console.log('This is the response from the server: ', response);
				$scope.$emit("new-list-item-added", response.data)
			},
			function(error){
				console.log(error)
			}
		)
	}
}]);