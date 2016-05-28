'use strict';
angular.module('RstFrontH5')
.controller('sunChiefDetailController',['$scope', '$state', '$stateParams', '$ionicPopup', 'NewsLetterService', 
function($scope, $state, $stateParams, $ionicPopup, NewsLetterService) {
	$scope.nowModule = NewsLetterService.nowPolicyModule;
	
	//获取资讯正文 
	var getSunChiefDetail = function (param) {
			$scope.showHud();
			NewsLetterService.getSunChiefDetail(param, true)
					.success(function(data){
						$scope.hideHud();
             			$scope.SunChiefDetail = data.body;
	                })
	                .error(function(data){
	                	$scope.hideHud();
	                });
	};
	
	//组装查询参数
	var param = {
		policyID:$stateParams.idNews
	};
	
	//资讯正文
	getSunChiefDetail(param);
	$scope.listenH5Event('app_sunChiefDetail');
}]
);