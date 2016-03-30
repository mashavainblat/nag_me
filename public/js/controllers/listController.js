var app = angular.module("ListController", []);

app.controller("ListController", ["$http", "$scope", function($http, $scope){
	this.testList = "List"
	var self = this;

	/* SCOPE LISTENERS */
	/*********************************************/
	$scope.$on("user-logged-in", function(eventObj, data){
		self.user = data;
		console.log("user-logged-in self.user: ", self.user)
	})

	$scope.$on("user-signed-up", function(eventObj, data){
		self.user = data;
		console.log("user-signed-up self.user: ", self.user)
	})

	$scope.$on("user-logged-out", function(eventObj, data){
		self.user = data
		self.user.loggedIn = false;
		console.log("user-logged-out: ", self.user)
	})

	$scope.$on("new-list-item-added", function(eventObj, data){
		self.user = data
		console.log("new-list-item-added, self.user: ", self.user)
	})
	/*********************************************/
	/* END SCOPE LISTENERS */

	this.deleteItem = function(index, listItem, listItemId){
		// console.log("clicked listItem: ", listItem)
		// console.log("index: ", index)
		console.log("listItemId: ", listItemId)

		var userList = self.user.list;
		userList.splice(index, 1);

		$http.delete("/users/deleteListItem/" + listItemId).then(
			function(response){
				console.log(response.data)
			},
			function(error){
				console.log(error)
			}
		)
	}
}])