angular.module('starter.controllers')
.controller('HomeCtrl', function($q, $scope, $rootScope, $state, $ionicLoading) {
	

	$scope.startTracking = function() {
		$rootScope.hash= document.getElementById("hash").value;
		$state.go('tweets');
	}

})