'use strict';
angular.module('RstFrontH5')
.controller('stuInsController',
['$scope', '$ionicActionSheet', '$ionicScrollDelegate', '$state', '$ionicHistory', '$ionicPopup', 'stuInsService', 'ApiService',
function($scope, $ionicActionSheet, $ionicScrollDelegate, $state, $ionicHistory, $ionicPopup, sis, as) {
	
	$scope.goBack = function(){
		//$ionicHistory.goBack();
		history.go(-1);
	};
	
	$scope.goBackStuIndex = function(){
		$state.go("app.stuInsIndex");
	};
	$scope.showSearchButton = function(){
		$state.go("app.stuInsParent");
	}
	
	$scope.goHome = function(){
		as.backToHome();
	};
	
	$scope.keyupByParent = function(event){
		if(event.keyCode === 13){
			$scope.searchByParent();
		}
	};
	
	$scope.searchByParent = function(){
		var parentPhone = document.getElementById('stu_parentPhone').value;
		if(!parentPhone){
			$scope.nativeTip('请输入付款人手机号');
		}else {
			var relRg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    			if(!parentPhone.match(relRg)){
    				$scope.nativeTip('手机号码有误，请重新输入');
    			}else {
    				sis.searchParam = {way:'mobile', mobilenum:parentPhone};
    				$state.go('app.stuInsResult');
    			}
		}
	};
	
	$scope.initSuccess = function(){
		$scope.payAmount = sis.currentBill?sis.currentBill.payAmount:'100.00'; 
	};
	
	$scope.initIntroduce = function(event){
		$scope.isChecked = true;
		var content = document.getElementsByClassName('stuInsIntroContent')[0],
			cssObj = window.getComputedStyle(content);
		if((parseInt(cssObj.height)/parseInt(cssObj.width)) >= 1.6){
			$scope.imgs = {
				img1: 'images/pic_xpx01_1500.png',
				img2: 'images/pic_xpx02_1500.png',
				img3: 'images/pic_xpx03_1500.png',
				img4: 'images/pic_xpx04_1500.png'
			};
		}else {
			$scope.imgs = {
				img1: 'images/pic_xpx01_640.png',
				img2: 'images/pic_xpx02_640.png',
				img3: 'images/pic_xpx03_640.png',
				img4: 'images/pic_xpx04_640.png'
			};
		}
		
		$scope.listenH5Event('app_stuInsurance_stuIntroduce');
	};
	
	$scope.goChildView = function(){
		if(!$scope.isChecked){
			$scope.nativeAlert({text:'请详细阅读并同意条款细则'});
		}else{
			$state.go('app.stuInsChildParams',{goBackIndex:'1'});

		}
	};
	$scope.checkArticle = function(){
		$scope.isChecked = !$scope.isChecked;
	}
}]
);