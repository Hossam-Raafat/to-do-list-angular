var app = angular.module('todo-app', ['ng-token-auth']);

app.controller(
	'todo-controller', function( $scope, $http, $auth){
		$scope.toDo = 'To-Do';
		$scope.done = 'Done';
		$scope.items = [];
		$scope.editing = false;
		$http.get('http://localhost:3000/items.json').then(
			function(success) {
				$scope.items = success.data;
			},
			function(err) {
				console.log(err);
			});

		$scope.addItem = function(){
			var add = {
				body: $scope.itemForm
			}
			$http.post('http://localhost:3000/items.json',{ item: add}).then(
				function(success){
					$scope.itemForm = '';
					$scope.items.push(success.data);
				},
				function(err){
					console.log(err);
				});
		};
		$scope.deleteItem = function(item){
			$http.delete('http://localhost:3000/items/'+ item.id +'.json').then(
				function(success){
					var index = $scope.items.indexOf(item);
					$scope.items.splice(index, 1);
				});
		};
		$scope.editItem = function(item){
			var edit = {
				body: item.body
			}
			$http.put('http://localhost:3000/items/'+ item.id +'.json',{ item: edit }).then(
				function(success){
					item = success.data;
				},
				function(err){
					console.log(err);
				});
		};
		 $scope.doneItems = function(item){
		 	var done = {
		 		status: item.status
		 	}
		 	$http.put('http://localhost:3000/items/'+ item.id +'.json',{ item: done }).then(
		 		function(success){
		 			item = success.data;
		 		},
		 		function(err){
		 			console.log(err);
		 		});
		 };
		// $scope.registerUser = function(){
		// 	$auth.submitRegistration($scope.registrationForm).then(
		// 		function(success){

		// 		}).catch(function(err){

		// 		});
		// };
		$scope.handleRegBtnClick = function() {
      $auth.submitRegistration($scope.registrationForm)
        .then(function(resp) {
          // handle success response
          toaster.success('Successfuly register', 'good job!');
        })
        .catch(function(resp) {
          // handle error response
          toaster.error('Something went wrong', 'please try again!');
        });
      }

		$scope.authenticationProcess = function(){
			$auth.submitLogin($scope.loginForm).then(function(user){
				toaster.success('Successful login', 'Bravo!');
			}).catch(function(err){
				toaster.error('Your credintials are wrong', 'Error');
			});
		};
	}
);
app.config(function($authProvider) {
    $authProvider.configure({
      apiUrl: 'http://localhost:3000',
      validateOnPageLoad: false
		});
});
