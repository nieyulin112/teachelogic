'use strict';
angular.module('RstFrontH5')
.controller('stuChildController',
['$scope', '$ionicActionSheet', '$ionicScrollDelegate', '$state', '$ionicHistory', '$ionicPopup', 'stuInsService', 'ApiService',
function($scope, $ionicActionSheet, $ionicScrollDelegate, $state, $ionicHistory, $ionicPopup, sis, as) {
	$scope.isSearchByName = true;
	sis.sltSclCode = '';
	sis.sltClsCode = '';
	sis.stu_childName='';

	$scope.goIntroduce = function(){
		var params = $state.params;
		if(params && params.goBackIndex==='1'){
			$state.go("app.stuInsIntroduce");
		}else{
			$state.go("app.stuInsIndex");
		}
	}
	
	$scope.goBack = function(){
		$ionicHistory.goBack();
		//
		//history.go(-1);
		//$state.go("app.stuInsIntroduce");
	};
	
	$scope.showByName = function(){
		$scope.isSearchByName = true;
	};
	
	$scope.showByCard = function(){
		$scope.isSearchByName = false;
	};
	
	$scope.showClassView = function(){
		if(sis.sltSclCode){
			$state.go('app.stuInsClass');
		}else {
			$scope.nativeTip('请先选择学校');
		}
	};
	
	$scope.keyupByName = function(event){
		if(event.keyCode === 13){
			$scope.searchByChild();
		}
	};
	$scope.showSearchButton = function(){
		//$state.go("app.stuInsChild");
	}
	
	$scope.goStuInsSchool = function(){
		$state.go("app.stuInsSchool");
	}
	
	
	$scope.keyupByCard = function(event){
		if(event.keyCode === 13){
			$scope.searchByChild();
		}
	};
	
	$scope.searchByChild = function(){
		sis.searchParam = {way:'name'};
		if($scope.isSearchByName){// 按姓名
			var childName = document.getElementById('stu_childName').value;
			if(!childName){
				$scope.nativeTip('请输入参保人姓名');
			}else {
				if(childName.length<2 || childName.length>20){
					$scope.nativeTip('您输入的参保人姓名长度不合法，请重新输入');
				}else {
					sis.searchParam.stuName = childName;
					if(sis.sltSclCode){
						sis.searchParam.schoolId = sis.sltSclCode;
					}
					if(sis.sltClsCode){
						sis.searchParam.classID = sis.sltClsCode;
					}
					$state.go('app.stuInsResult');
				}
			}
		}else {// 按身份证号
			var chileIdCard = document.getElementById('stu_chileIdCard').value;
			if(!chileIdCard){
				$scope.nativeTip('请输入参保人身份证号');
			}else {
				var testIdCard = /^[1-9]\d{14}$|^[1-9]\d{16}(?:\d|x|X)$/;
				if(!testIdCard.test(chileIdCard)){
					$scope.nativeTip('身份证号输入有误，请重新输入');
				}else {
					sis.searchParam.idCard = chileIdCard;
					$state.go('app.stuInsResult');
				}
			}
		}
	};
	
	$scope.listenH5Event('app_stuInsurance_stuChild');
}]
);