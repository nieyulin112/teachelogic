'use strict';
angular.module('RstFrontH5')
.controller('hhDetailController',
['$scope', '$state', '$ionicPopup', '$ionicScrollDelegate', '$filter', 'healHisService', 'ApiService',
function($scope, $state, $ionicPopup, $ionicScrollDelegate, $filter, hhs, as) {

	$scope.recbo = true;
	$scope.recbool = true;

	var changeTwoDecimal = function(number){
		var f_y = parseFloat(number);
		if(isNaN(f_y)){
			return '0.00';
		}
		var f_x = Math.round(f_y*100)/100;
		var s_x = f_x.toString();
		var decial = s_x.indexOf('.');
		if(decial<0){
			decial = s_x.length;
			s_x += '.';
		}
		while(s_x.length<=decial+2){
			s_x += '0';
		}
		return s_x;
	};
	
	if($scope.isMobile && !$scope.zoneCode){
		$$.Native.getLocalData({name:'zoneCode', callback:function(zoneCode){
			$scope.zoneCode = zoneCode;
		}});
	};

	$scope.initDetail = function() {
		var params = $state.params;
		$scope.visitNo = params.visitNo;
			hhs.getHisDetail($scope.visitNo, true)
			.success(function(data) {
				if(data && data.code === $scope.rspState.success){
					data.body = data.body || {};
					data.body.data1 = data.body.data1 || [];
					data.body.data2 = data.body.data1 || [];
					data.body.data3 = data.body.data1 || [];
					
					var visitAmount = data.body.visitAmount;
					var selfPay = data.body.selfPay;
					var fundPay = data.body.fundPay;

					data.body.visitAmount = changeTwoDecimal(visitAmount);
					data.body.selfPay = changeTwoDecimal(selfPay);
					data.body.fundPay = changeTwoDecimal(fundPay);

					for(var i = 0;i<data.body.data1.length;i++){
						var sumAmount1 = data.body.data1[i].sumAmount;
						data.body.data1[i].sumAmount = changeTwoDecimal(sumAmount1);
					}

					for(var j = 0;j<data.body.data2.length;j++){
						var sumAmount2 = data.body.data2[j].sumAmount;
						data.body.data2[j].sumAmount = changeTwoDecimal(sumAmount2);
					}

					for(var k = 0;k<data.body.data3.length;k++){
						var sumAmount3 = data.body.data3[k].sumAmount;
						data.body.data3[k].sumAmount = changeTwoDecimal(sumAmount3);
					}

					$scope.medicalDetail = data.body;
				}else {
					$scope.recbo = false;
				}
			}).error(function() {});
	};
	
	$scope.backToPre = function(){
		history.go(-1);
		as.showFooterMenu();
	};
	
	$scope.skipPillDetail = function(item,zoneCode) {
		if($scope.zoneCode ==='0592'){
			hhs.currentPill = item;
			$state.go('app.pillRecordDetail',{billDetailNo:item.billDetailNo});
		}
	};
	
	$scope.initPillDetail = function() {
		$scope.billDetailNo = $state.params.billDetailNo;
		var param = {billDetailNo:$scope.billDetailNo, projectCode:hhs.currentPill.projectCode};
		hhs.getPillDetail(param, true)
			.success(function(data){
				if(data && data.code===$scope.rspState.success){
					$scope.pillDetail = data.body;
				}else{
					$scope.recbool = false;
				}
			}).error(function() {
			});
	};
	
	$scope.listenH5Event('app_healthHistory_detail');
}]
);
