'use strict';

/**
 * @ngdoc function
 * @name RstFrontH5.controller:MainController
 * @description
 * # MainController
 */
PSA.controller('MainController',['$scope','$state', '$ionicHistory', '$ionicPopup', '$rootScope', '$ionicConfig','siConfig','ExampleService', 'ApiService', 
function($scope, $state, $ionicHistory, $ionicPopup, $rootScope, $ionicConfig, siConfig, ExampleService, ApiService) {
    $scope.emptyMsg = '抱歉，没有相关记录';
    $scope.errorMsg = '网络连接不可用，请稍后再试';
    $scope.isMobile = typeof($$)!=='undefined' && typeof($$.Native)!=='undefined';
    $scope.reqParam = {start:0, limit:10};
    $scope.rspState = {success:10000, error:20000};

	if($scope.isMobile && !$scope.zoneCode){
		$$.Native.getLocalData('zoneCode', function(zoneCode){
			$scope.zoneCode = zoneCode;
		})
	};

    $scope.showHud = function(){
    		ApiService.showHud();
    };
    
    $scope.hideHud = function(){
    		ApiService.hideHud();
    };
    
    $scope.goBack = function(backNum){
		if(backNum){
			$ionicHistory.goBack(backNum);
		}else {
			$ionicHistory.goBack();
		}
	};

	/**
	 * backView equals history.back ??
	 */
	$scope.back = function () {
		history.back();
	}
    
    $scope.testPromise=function(){
      	return ExampleService.testServiceRequest()
			.success(function(data){
			  console.log('in success main');
			})
			.error(function(data){
			  console.log('in error main');
			});
    };
    
    $scope.jumpToState = function(stateName, catagory){
//    	ApiService.skipNextPageTransition(true);
		$ionicConfig.views.transition('none');// 关闭翻页动画
	    if (catagory) {
			if (typeof(catagory) === 'string') {
				catagory = JSON.parse(catagory);
			}
			$state.go(stateName, catagory, {reload:true});
		} else {
			$state.go(stateName, {}, {reload:true});
		}
		setTimeout(function(){
			$ionicConfig.views.transition('ios');// 打开翻页动画
		}, 1000);
    };

	$scope.home = $scope.backToHome = function(){
		ApiService.backToHome();
		// $state.go('app.empty');
	};

    var skip = true;
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
//		if (ApiService.skipNextPageTransition()) {
//			$ionicConfig.views.transition('none');
//			ApiService.skipNextPageTransition(false);
//		} else {
//			$ionicConfig.views.transition('platform');
//		}
    });
    
//  锚点
	$scope.listenH5Event = function(ancho){
		if(ancho && !ApiService.isLocalEnv() && typeof($$)!=='undefined' && typeof($$.Native)!=='undefined'){
			$$.Native.listenH5Event(ancho);
		}
	};
	
	$scope.nativeAlert = function(options){
		options = options || {};
		options.text = options.text || '请填写提示信息';
		options.btnText = options.btnText || '确定';
		options.btnCallback = options.btnCallback || function(){};
		if(typeof($$)!=='undefined' && typeof($$.Native)!=='undefined'){
			$$.Native.alert(options);
		}else {
			$ionicPopup.alert({title: '提示',template: options.text});
		}
	};
	
	$scope.nativeConfirm = function(options){
		options = options || {};
		options.text = options.text || '请填写提示信息';
		options.leftBtnText = options.leftBtnText || '取消';
		options.rightBtnText = options.rightBtnText || '确定';
		options.leftBtnCallback = options.leftBtnCallback || function(){};
		options.rightBtnCallback = options.rightBtnCallback || function(){};
		if(typeof($$)!=='undefined' && typeof($$.Native)!=='undefined'){
			$$.Native.confirm(options);
		}else {
			var confirmPopup = $ionicPopup.confirm({
				title: '提示',
				template: options.text
			});
			confirmPopup.then(function(res) {
				if (res) {
					options.rightBtnCallback();
				} else {
					options.leftBtnCallback();
				}
			});
		}
	};
	
	$scope.nativeTip = function(text){
		if(typeof($$)!=='undefined' && typeof($$.Native)!=='undefined'){
			$$.Native.tip(text);
		}else {
			$ionicPopup.alert({title: '提示',template: text});
		}
	};
	
	$scope.nativeDate = function(options){
		if($scope.isMobile){
			$$.Native.selectDate(options);
		}
	};
	
}]);
