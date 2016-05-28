'use strict';
angular.module('RstFrontH5')
.controller('prescriptionController', ['$scope','$state','prescriptionService','ApiService','$ionicPopup','$ionicScrollDelegate',function($scope,$state,prescriptionService,ApiService,$ionicPopup,$ionicScrollDelegate) {
	//标示是否显示处方页面的content，默认为显示
	$scope.showPreContent=true;
	//标示是否显示处方详情页面的content，默认为显示
	$scope.showPreDetailContent=true;
	//标示是否显示处方药品详情页面的content，默认为显示
	$scope.showPrePillDetailContent=true;
	
	$scope.limit=prescriptionService.getLimit();
	$scope.isOver=true;
	$scope.start=0;

	//初始化处方
	$scope.initPrescriptionList=function(){
		$scope.getNextPagePrescriptionHud(0);
		$scope.listenH5Event('app_myPrescription');
    };
    
    $scope.preSucCallBack = function(data, start){
    		if(data.body.length){
			if(start === 0){
				$scope.prescriptionList = data.body;
			}else {
				$scope.prescriptionList = $scope.prescriptionList.concat().concat(data.body);
			}
			$scope.isOver = data.body.length >= $scope.limit;
	        $scope.start = start + $scope.limit;
	        $ionicScrollDelegate.$getByHandle('myPreScroll').resize();
		}else {
			$scope.prescriptionList=[];
			$scope.showPreContent=false;
			$scope.isOver = false;
		}
		$scope.isFetching = false;	
		$scope.$broadcast('scroll.refreshComplete');
	    $scope.$broadcast('scroll.infiniteScrollComplete');
    };
    
    $scope.getNextPagePrescriptionHud=function(start){
    		if($scope.isFetching) return;
		$scope.isFetching = true;
		$scope.showHud();
    	prescriptionService.getPrescriptionList(start, true)
        .success(function(data){
        	$scope.hideHud();
     		$scope.preSucCallBack(data, start);
        })
        .error(function(data){
        	$scope.hideHud();
        	$scope.isOver = false;
        	$scope.isFetching = false;
        	$scope.$broadcast('scroll.refreshComplete');
		    $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }
    
    //刷新处方
    $scope.getNextPagePrescription=function(start){
    		if($scope.isFetching) return;
		$scope.isFetching = true;
    	prescriptionService.getPrescriptionList(start, true)
        .success(function(data){
     		$scope.preSucCallBack(data, start);
        })
        .error(function(data){
        	$scope.isOver = false;
        	$scope.isFetching = false;
        	$scope.$broadcast('scroll.refreshComplete');
		    $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    }
  
    //跳转到处方详情
	$scope.getPrescriptionDetail = function(anagraphCode,anagraphStatus){
		$state.go('app.prescriptionDetail',{anagraphCode:anagraphCode, anagraphStatus:anagraphStatus});
	};
    //初始化处方详情
  	$scope.initPrescriptionDetail = function(){
  		var params = $state.params;
		$scope.anagraphCode = params.anagraphCode;
		$scope.anagraphStatus = params.anagraphStatus;
		$scope.showHud();
		prescriptionService.getPrescriptionDetail($scope.anagraphCode,$scope.anagraphStatus, true)
		    .success(function(data){
		    	$scope.hideHud();
           		if(data.body !== null && data.body.drugList && data.body.drugList.length){
           			if(data.body.anagraphStatus==='1'){
           				data.body.anagraphStatusStr='等待确认';
           			}
					$scope.prescriptionDetail=data.body;
				}else {
					$scope.showPreDetailContent=false;
				}	
            })
            .error(function(data){
            	$scope.hideHud();
            });
        $scope.listenH5Event('app_prescriptionDetail');    
	};
		
    //跳转到处方药品详情
	$scope.getPrescriptionPillDetail = function (itemId,itemCode,anagraphStatus){
	    $state.go('app.prescriptionPillDetail',{itemId:itemId,itemCode:itemCode,anagraphStatus:anagraphStatus});
	};
	$scope.formatNumber = function(data){
		if(!data) data='0';
		data = ''+data;
		if(data.indexOf(".")>0){
			data = data+"00";
			data = data.substr(0,data.indexOf(".")+3);
		}else{
			data = data+".00";
		}
		return data;
	}
    //初始化处方药品详情
    $scope.initPrescriptionPillDetail = function(){
	    var params = $state.params;
		$scope.itemId = params.itemId;
		$scope.itemCode = params.itemCode;
		$scope.anagraphStatus = params.anagraphStatus;
		$scope.showHud();
		prescriptionService.getPrescriptionPillDetailList($scope.itemId,$scope.itemCode,$scope.anagraphStatus)
        		.success(function(data){
        		$scope.hideHud();
				if(data.body && data.body.name && data.body.name !== ''){
					$scope.prescriptionPillDetailList = data.body;
				}else {
					$scope.showPrePillDetailContent=false;
				}
            })
            .error(function(data){
            	$scope.hideHud();
            });
        $scope.listenH5Event('app_prescriptionPillDetail');    
    };
	
	//处方列表查看全部或点击收起
	$scope.showAllMpreListMethod = function(prescription){
		prescription.showAllMpreList=!prescription.showAllMpreList;
	};
	//返回主页
	$scope.backToHome = function() {
		ApiService.backToHome();
	}
}]);