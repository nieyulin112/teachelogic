'use strict';
angular.module('RstFrontH5')
.controller('InformationBodyController',['$scope', '$state', '$stateParams', '$ionicPopup', 'NewsLetterService', 
function($scope, $state, $stateParams, $ionicPopup, NewsLetterService) {
	$scope.nowModule = NewsLetterService.nowPolicyModule;
	
	//获取资讯正文 
	var getInformationBody = function (param) {
		$scope.showHud();
			NewsLetterService.getInformationBody(param, true)
					.success(function(data){
						$scope.hideHud();
             			$scope.informationBody = data.body;
             			if($scope.informationBody.zonetag !== null && $scope.informationBody.zonetag !=='' ) {
             				$scope.isHaveZonetag = true; 
             			}
             			if($scope.informationBody.newsFrom !== null && $scope.informationBody.newsFrom !== '' ) {
             				$scope.isHaveNewsFrom = true; 
             			}
	                })
	                .error(function(data){
	                	$scope.hideHud();
	                });
	};

	//控制标签的布尔值
	$scope.isHaveZonetag = false; 
	$scope.isHaveNewsFrom = false;

	//组装查询参数
	var param = {
		idNews:$stateParams.idNews
	};
	//资讯正文初始化
	getInformationBody(param);
	$scope.listenH5Event('app_informationBody');
	
	//分享资讯正文
	$scope.shareBody = function(){
		 // var hideSheet = $ionicActionSheet.show({
   //         buttons: [
   //           { text: '<b>分享</b>到微信' },
   //           { text: '下载此文章' }
   //         ],
   //         destructiveText: '了解相关信息',
   //         titleText: '人社通实时资讯',
   //         cancelText: '取消',
   //         cancel: function() {              
   //         },
   //         buttonClicked: function() {
   //         	return;
   //         },
   //         destructiveButtonClicked: function(){
   //         	return;
   //         }
   //       });
			$scope.nativeTip('待拓展功能');
	};
	
}]
);