'use strict';
angular.module('RstFrontH5')
.controller('stuRefController',
['$scope', '$ionicActionSheet', '$ionicScrollDelegate', '$state', '$ionicHistory', '$ionicPopup', 'stuInsService', 'ApiService',
function($scope, $ionicActionSheet, $ionicScrollDelegate, $state, $ionicHistory, $ionicPopup, sis, as) {

	$scope.goBack = function(){
		$ionicHistory.goBack(-3);
	};
	
	$scope.refreshDetail = function(){
		sis.currentBill = sis.currentBill || {billsNo:'',result:'',canPay:''}
		$scope.showHud();
		sis.refreshDetail({billsNo: sis.currentBill.billsNo}, true)
			.success(function(rsp){
				$scope.hideHud();
				if(rsp && rsp.code===sis.success){
					var body = rsp.body;
					if(body){
						sis.currentBill = body;
						body.stuSexName = body.stuSex==='0'?'男':'女';
						body.status = body.result==='00'?'已缴费':'';
						$scope.isCanPay = body.canPay==='00';
						$scope.modelBill = body;
					}
				}else {
					$scope.nativeTip(rsp.message);
				}
			})
			.error(function(){
				$scope.hideHud();
			});
	};
}]
);