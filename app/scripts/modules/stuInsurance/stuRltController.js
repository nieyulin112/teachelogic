'use strict';
angular.module('RstFrontH5')
.controller('stuRltController',
['$scope', '$ionicActionSheet', '$ionicScrollDelegate', '$state', '$ionicHistory', '$ionicPopup', 'stuInsService', 'ApiService',
function($scope, $ionicActionSheet, $ionicScrollDelegate, $state, $ionicHistory, $ionicPopup, sis, as) {

	$scope.goBack = function(){
		//$ionicHistory.goBack();
		history.go(-1);
	};
	
	$scope.initResult = function(){
		$scope.showHud();
		sis.getResult(sis.searchParam, true)
			.success(function(rsp){
				$scope.hideHud();
				if(rsp && rsp.code===sis.success){
					var body = rsp.body || [];
					if(body && body.length){
						for(var i in body){
							var item = body[i],
								statusNo = item.result;
							if(statusNo==='00'){
		    	    					item.statusNum = 1;
		    	    					item.status = '已缴费';
		    	    				}else if(statusNo==='01'){
		    	    					item.statusNum = 0;
		    	    					item.status = '处理中';
		    	    				}else if(statusNo==='02'){
		    	    					item.statusNum = 0;
		    	    					item.status = '未缴费';
		    	    				}
						}
						$scope.storeResult = body;
					}else {
						$scope.isEmpty = true;
					}
				}else {
					$scope.nativeTip(rsp.message);
				}
			})
			.error(function(){
				$scope.hideHud();
			});
			
		$scope.listenH5Event('app_stuInsurance_stuResult');
	};
	
	$scope.showDetail = function(item){
		sis.currentBill = item;
		$state.go('app.stuInsDetail');
	};
	
	$scope.getDetail = function(){
		sis.currentBill = sis.currentBill || {billsNo:'',result:'',canPay:''}
		var param = {
			billsNo: sis.currentBill.billsNo, 
			result: sis.currentBill.result,
			canPay: sis.currentBill.canPay
		};
		$scope.showHud();
		sis.getDetail(param, true)
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
	
	$scope.showPayView = function(){
		if(typeof($$)==='undefined' || as.isLocalEnv()){
			$state.go('app.stuInsSuccess');
		}else {
			$$.Native.payByPingAnFu({
				tranCode: sis.currentBill.billsNo||'',
				callback: function(rsp){
					if(rsp){
				    		if(typeof(rsp) === 'string'){
				    			rsp = JSON.parse(rsp);
				    		}
				    		if(rsp.resultCode === '1000'){
				    			$state.go('app.stuInsSuccess');
				    		}else if(rsp.resultCode === '20001'){// token失效
				    			$scope.nativeTip('手机登陆已过期，请重新登陆');
				    		}
				    	}
				}
			});
		}
	};
}]
);