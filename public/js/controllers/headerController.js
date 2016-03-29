var app = angular.module("HeaderController", ["ngCookies"]);

app.controller("HeaderController", ["$http", "$cookies", function($http, $cookies){
	var self = this;
	// this.list = []
	this.user = {}

	var cookies = $cookies.getAll();
	
		if (cookies.userFirstName && cookies.userLastName && cookies.userEmail && cookies.userPhoneNumber){
		self.user = {
			firstName: cookies.userFirstName,
			lastName: cookies.userLastName,
			email: cookies.userEmail,
			password: cookies.userPassword,
			phoneNumber: cookies.userPhoneNumber,
			list: cookies.userList,
			loggedIn: true
		};
	};
	console.log(cookies);

	this.addListItem = function(){
		$http({
			method: "POST",
			url: "/users/addListItem",
			data: this
		}).then(
			function(response){
				console.log(response)
				var cookies = $cookies.getAll();
				console.log(cookies)
			},
			function(error){
				console.log(error)
			}
		)
	}
}])