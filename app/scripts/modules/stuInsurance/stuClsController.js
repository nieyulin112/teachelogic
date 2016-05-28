'use strict';
angular.module('RstFrontH5')
.controller('stuClsController',
['$scope', '$ionicActionSheet', '$ionicScrollDelegate', '$state', '$ionicHistory', '$ionicPopup', 'stuInsService', 'ApiService',
function($scope, $ionicActionSheet, $ionicScrollDelegate, $state, $ionicHistory, $ionicPopup, sis, as) {
	$scope.classStart = 1;
	$scope.classKey = '';
	
	$scope.goBack = function(){
		$ionicHistory.goBack();
	};
	
	$scope.classKeyUp = function(event){
		if(event.keyCode===13){
			$scope.getClassByKeyHud(1);
		}
	};
	
	$scope.clearKey = function(){
		$scope.isShowList = false;
		$scope.classKey = '';
		$scope.storeClass = [];
		$scope.isEmpty = false;
		$scope.classMore = false;
	};
	
	$scope.clsSucCallBack = function(rsp, start){
		if(rsp && rsp.code===sis.success){
			var body = rsp.body || [];
			if(body && body.length){
				$scope.classStart = start + sis.limit;
				$scope.classMore = body.length >= sis.limit;
				for(var i in body){
					var item = body[i];
					item.keyWordName = item.className.replace($scope.classKey,'<span class="search_key">'+$scope.classKey+'</span>');
				}
				if(start === 1){
					$scope.storeClass = body;
					$ionicScrollDelegate.$getByHandle('classScroll').scrollTop();
				}else {
					$scope.storeClass = $scope.storeClass.concat().concat(body);
				}
				$ionicScrollDelegate.$getByHandle('classScroll').resize();
			}else {
				$scope.storeClass = [];
				$scope.isEmpty = true;
				$scope.classMore = false;
			}
		}else {
			$scope.classMore = false;
			$scope.nativeTip(rsp.message);
		}
		$scope.isFetching = false;
		$scope.$broadcast('scroll.refreshComplete');
		$scope.$broadcast('scroll.infiniteScrollComplete');
	};
	
	$scope.getClassByKeyHud = function(start){
		if($scope.isFetching) return;
		$scope.classMore = false;
		$scope.isShowList = true;
		$scope.isEmpty = false;
		$scope.isFetching = true;
		$scope.showHud();
		sis.getClassByKey({start:start, limit:sis.limit, school:sis.sltSclCode, keyValue:$scope.classKey}, true)
			.success(function(rsp){
				$scope.hideHud();
				$scope.clsSucCallBack(rsp, start);
			})
			.error(function(){
				$scope.hideHud();
				$scope.isFetching = false;
				$scope.classMore = false;
				$scope.$broadcast('scroll.refreshComplete');
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
	};
	
	$scope.getClassByKey = function(start){
		if($scope.isFetching) return;
		$scope.classMore = false;
		$scope.isShowList = true;
		$scope.isEmpty = false;
		$scope.isFetching = true;
		sis.getClassByKey({start:start, limit:sis.limit, school:sis.sltSclCode, keyValue:$scope.classKey}, true)
			.success(function(rsp){
				$scope.clsSucCallBack(rsp, start);
			})
			.error(function(){
				$scope.isFetching = false;
				$scope.classMore = false;
				$scope.$broadcast('scroll.refreshComplete');
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
	};
	
	$scope.selectClass = function(item){
		sis.sltClsCode = item.classCode;
		document.getElementById('stu_clsName').value = item.className;
		history.go(-1);
	};
	
	$scope.listenH5Event('app_stuInsurance_stuClass');
}]
);