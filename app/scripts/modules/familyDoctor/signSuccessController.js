'use strict';
angular.module('RstFrontH5')
.controller('signSuccessController',
['$scope', '$state', 'familyDoctorService',
function($scope, $state, fds) {

	$scope.initSuccess = function(){
		var params = $state.params;
		$scope.autoSign = params.autoSign;
		$scope.modelDoctor = fds.modelDoctor;
		$scope.actCode = params.actCode;
	};
	
	$scope.successClick = function(){
		fds.isFromSuccess = true;
		if(fds.isChange){
			fds.isChange = false;
		}
		$scope.backToHome();
	};
}]
);