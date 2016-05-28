/*
 * author:nieyulin756
 * date:2015-11-15
 * 参保信息
 */
'use strict';
angular.module('RstFrontH5')
	.controller('insuranceInfoController',['$scope','$state','ApiService','siConfig','insuranceInfoService',function($scope,$state,ApiService,siConfig,insuranceInfoService) {

		if($state.current.name === 'app.insuranceInfo'){
			$scope.showHud();
			insuranceInfoService.getInsuranceInfoData(true)
			.success(function(data){
				$scope.hideHud();
				$scope.insuranceInfoData = data.body;
				data.body.image = data.body.SEX==='女' ? 'images/per_female.png' : 'images/per_male.png';
			}).error(function(data){
				$scope.hideHud();
			});
		}
		
		//已参保和过保
		$scope.isCheck = function(item) {
			if(item.insuranceStatus ==='参保') {
				item.color = 'balanced ion-checkmark';
				return item.color;
			}else if(item.insuranceStatus === '过保'){
				item.color = 'font-gray';
				return item.color;
			}
			else if(item.insuranceStatus ==='1') {
				item.color = 'balanced ion-checkmark';
				return item.color;
			}else if(item.insuranceStatus === '4'){
				item.color = 'font-gray';
				return item.color;
			}
		};

		//跳转到缴费明细
		$scope.skipPayment = function(){
			$state.go('app.paymentDetail');
		};
}]);