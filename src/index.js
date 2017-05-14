var app = angular.module('todo-app', []);

app.controller(
	'todo-controller', function($scope, $http){
		$scope.toDo = 'To-Do';
		$scope.done = 'Done';
		$scope.items = [];
		$http.get('http://localhost:3000/items.json').then(
			function(success) {
				$scope.items = success.data;
			},
			function(err) {
				console.log(err);
			})

		$scope.addItem = function(){
			var add = {
				body: $scope.itemForm
			}
			$http.post('http://localhost:3000/items.json', add).then(
				function(success){
					$scope.itemForm = '';
					$scope.items.push(success.data);
				},
				function(err){
					console.log(err);
				})
		}

			
	});
