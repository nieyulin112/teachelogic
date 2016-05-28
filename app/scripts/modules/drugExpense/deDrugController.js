'use strict';
angular.module('RstFrontH5')
.controller('drugExpenseDetailController',
['$scope', '$state', '$ionicScrollDelegate', 'drugExpenseService', 'ApiService',
function($scope, $state, $ionicScrollDelegate, des, as) {

	$scope.initDetail = function(){
		$scope.drugDetail = des.currentItem;
	};
	
	$scope.getDrugDetail = function(drugCode){
		var param = {drugCode:drugCode};
		des.getDrugDetail(param)
			.success(function(rsp){
				if(rsp && rsp.code === $scope.rspState.success){
					$scope.drugDetail = rsp.body || {};
				}
			});
	};
	
	$scope.listenH5Event('app_drugExpense_detail');
}]
);