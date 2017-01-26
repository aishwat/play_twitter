angular.module('starter.controllers')
.controller('TweetsCtrl', function($q, $scope, $rootScope, $state, $ionicLoading,$interval,Api) {
	$scope.show = function() {
		$ionicLoading.show({
			content: 'Loading',
			animation: 'fade-in'
		});
	};
	$scope.hide = function() {
		$ionicLoading.hide();
	};


	console.log('in TweetsCtrl');
	var apiCall = function(word) {
		var callback = function(err, result) {
			if (err){
				alert(err);
				$scope.hide();
			}
			else {
				console.log(result);
				$scope.tweets=result;
				$scope.hide();	

			}
			
		}
		Api.get(word, callback);
	}
	$scope.show();
	apiCall($rootScope.hash);

	var cron =  $interval(function(){
		$scope.show();
		console.log('updating')
		apiCall($rootScope.hash);
	},10*1000); //10 sec
	// $interval.cancel(cron);


	$scope.$on('$destroy', function() {
          $interval.cancel(cron);
          cron = undefined;
      });

})



