'use strict';
angular.module('RstFrontH5')
.controller('sunChiefSearchController',
['$scope', '$state', '$ionicPopup', '$ionicScrollDelegate', 'NewsLetterService', 'ApiService',
function($scope, $state, $ionicPopup, $ionicScrollDelegate, ns, as) {
	$scope.limit = 20;
	
	$scope.policyKeyUp = function(event){
		$scope.policyKey = document.getElementById('scPolicyKey').value;
		if(event.keyCode===13){
			$scope.getPolicyByKeyHud(1);
		}
	};
	
	$scope.clearKey = function(){
		$scope.isShowList = false;
		$scope.policyKey = '';
		document.getElementById('scPolicyKey').value = '';
		$scope.sunChiefItems = [];
		$scope.isEmpty = false;
		$scope.policyMore = false;
	};
	
	$scope.chiefSucCallBack = function(data, param){
		var bodyTemp = data.body||[];
		var len = 0;
		len = bodyTemp.length;
		if(len >= $scope.limit){
			$scope.nextIndex = len + param.start;
			$scope.policyMore = true;
			$scope.isEmpty = false;
		}else if(len == 0 && param.start == 1){
			$scope.isEmpty = true;
			$scope.policyMore = false;
		}else{
			$scope.isEmpty = false;
			$scope.policyMore = false;
		}
		if(param.start == 1){
			$scope.sunChiefItems = bodyTemp;
			$ionicScrollDelegate.$getByHandle('scSearchScroll').scrollTop();
		}else if($scope.sunChiefItems && $scope.sunChiefItems.length){
			$scope.sunChiefItems = $scope.sunChiefItems.concat().concat(bodyTemp);
		}else {
			$scope.isEmpty = true;
		}
		$scope.isFetching = false;
		$scope.$broadcast('scroll.refreshComplete');
		$scope.$broadcast('scroll.infiniteScrollComplete');
	};
	
	$scope.getPolicyByKeyHud = function(start){
		if($scope.isFetching) return;
		$scope.policyKey = document.getElementById('scPolicyKey').value;
		if(!$scope.policyKey){
			$scope.nativeTip('请输入关键字查询');
		}else {
			$scope.policyMore = false;
			$scope.isShowList = true;
			$scope.isEmpty = false;
			$scope.isFetching = true;
			var param = {start:start, limit:$scope.limit, typeID:ns.activeTab, title:$scope.policyKey};
			$scope.showHud();
			ns.getSunChiefItems(param, true)
				.success(function(rsp){
					$scope.hideHud();
					$scope.chiefSucCallBack(rsp, param);
				})
				.error(function(){
					$scope.hideHud();
					$scope.isFetching = false;
					$scope.policyMore = false;
					$scope.$broadcast('scroll.refreshComplete');
					$scope.$broadcast('scroll.infiniteScrollComplete');
				});
		}
	};
	
	$scope.getPolicyByKey = function(start){
		if($scope.isFetching) return;
		$scope.policyKey = document.getElementById('scPolicyKey').value;
		if(!$scope.policyKey){
			$scope.nativeTip('请输入关键字查询');
		}else {
			$scope.policyMore = false;
			$scope.isShowList = true;
			$scope.isEmpty = false;
			$scope.isFetching = true;
			var param = {start:start, limit:$scope.limit, typeID:ns.activeTab, title:$scope.policyKey};
			ns.getSunChiefItems(param, true)
				.success(function(rsp){
					$scope.chiefSucCallBack(rsp, param);
				})
				.error(function(){
					$scope.isFetching = false;
					$scope.policyMore = false;
					$scope.$broadcast('scroll.refreshComplete');
					$scope.$broadcast('scroll.infiniteScrollComplete');
				});
		}
	};
	
	$scope.selectPolicy = function(item){
		$state.go('app.sunChiefDetail', {idNews:item.idNews});
	};
	
	$scope.listenH5Event('app_sunChiefSearch');
}]
);