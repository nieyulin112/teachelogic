'use strict';
angular.module('RstFrontH5')
.controller('stuSclController',
['$scope', '$ionicActionSheet', '$ionicScrollDelegate', '$state', '$ionicHistory', '$ionicPopup', 'stuInsService', 'ApiService',
function($scope, $ionicActionSheet, $ionicScrollDelegate, $state, $ionicHistory, $ionicPopup, sis, as) {
	$scope.schoolStart = 1;
	$scope.goBack = function(){
		//$ionicHistory.goBack();
		history.go(-1);
	};
	
	$scope.schoolKeyUp = function(event){
		if(event.keyCode===13){
			$scope.getSchoolByKeyHud(1);
		}
	};
	
	$scope.clearKey = function(){
		$scope.isShowList = false;
		$scope.schoolKey = '';
		$scope.storeSchool = [];
		$scope.isEmpty = false;
		$scope.schoolMore = false;
	};
	
	$scope.sclSucCallBack = function(rsp, start){
		if(rsp && rsp.code===sis.success){
			var body = rsp.body || [];
			if(body && body.length){
				for(var i in body){
					var item = body[i];
					item.keyWordName = item.schoolName.replace($scope.schoolKey,'<span class="search_key">'+$scope.schoolKey+'</span>');
				}
				if(start === 1){
					$scope.storeSchool = body;
					$ionicScrollDelegate.$getByHandle('schoolScroll').scrollTop();
				}else {
					$scope.storeSchool = $scope.storeSchool.concat().concat(body);
				}
				$ionicScrollDelegate.$getByHandle('schoolScroll').resize();
				$scope.schoolStart = start + sis.limit;
				$scope.schoolMore = body.length >= sis.limit;
			}else {
				$scope.isEmpty = true;
				$scope.schoolMore = false;
				$scope.storeSchool = [];
			}
		}else {
			$scope.schoolMore = false;
			$scope.nativeTip(rsp.message);
		}
		$scope.isFetching = false;
		$scope.$broadcast('scroll.refreshComplete');
		$scope.$broadcast('scroll.infiniteScrollComplete');
	};
	
	$scope.getSchoolByKeyHud = function(start){
		if($scope.isFetching) return;
		if(!$scope.schoolKey){
			$scope.nativeTip('请输入学校关键字查询');
		}else {
			$scope.schoolMore = false;
			$scope.isShowList = true;
			$scope.isEmpty = false;
			$scope.isFetching = true;
			$scope.showHud();
			sis.getSchoolByKey({start:start, limit:sis.limit, keyValue:$scope.schoolKey}, true)
				.success(function(rsp){
					$scope.hideHud();
					$scope.sclSucCallBack(rsp, start);
				})
				.error(function(){
					$scope.hideHud();
					$scope.isFetching = false;
					$scope.schoolMore = false;
					$scope.$broadcast('scroll.refreshComplete');
					$scope.$broadcast('scroll.infiniteScrollComplete');
				});
		}
	};
	
	$scope.getSchoolByKey = function(start){
		if($scope.isFetching) return;
		if(!$scope.schoolKey){
			$scope.nativeTip('请输入学校关键字查询');
		}else {
			$scope.schoolMore = false;
			$scope.isShowList = true;
			$scope.isEmpty = false;
			$scope.isFetching = true;
			sis.getSchoolByKey({start:start, limit:sis.limit, keyValue:$scope.schoolKey}, true)
				.success(function(rsp){
					$scope.sclSucCallBack(rsp, start);
				})
				.error(function(){
					$scope.isFetching = false;
					$scope.schoolMore = false;
					$scope.$broadcast('scroll.refreshComplete');
					$scope.$broadcast('scroll.infiniteScrollComplete');
				});
		}
	};
	
	$scope.selectSchool = function(item){
		sis.sltSclCode = item.schoolCode;
		document.getElementById('stu_sclName').value = item.schoolName; 
		sis.sltClsCode = '';
		document.getElementById('stu_clsName').value = '';
		//$scope.goBack();
		history.go(-1);
	};
	
	$scope.listenH5Event('app_stuInsurance_stuSchool');
}]
);