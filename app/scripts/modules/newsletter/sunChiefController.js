'use strict';
angular.module('RstFrontH5')
.controller('sunChiefController',['$scope', '$state', '$stateParams', '$ionicScrollDelegate', 'NewsLetterService', 
function($scope, $state, $stateParams, $ionicScrollDelegate, NewsLetterService) {
	
	$scope.findBool = true;
	$scope.sunOver = false;
	$scope.activeTab = '企业版';
	NewsLetterService.nowPolicyModule = '阳光政务';

	$scope.chiefSucCallBack = function(data, param){
		var bodyTemp = data.body||[];
		var len = 0;
		if(bodyTemp){
			len = bodyTemp.length;
		if(len >= 20){ //如果达到了20，就说明还有下一页的可能
			$scope.nextIndex = len + param.start;   //让nextIndex跟着变动
			$scope.sunOver = true;
			$scope.findBool = true;
		}else if(len == 0 && param.start == 1){
			$scope.findBool = false;  //如果没有检索到数据
			$scope.sunOver = false;
		}else{
			$scope.findBool = true;
			$scope.sunOver = false;
		}
		}
		if(param.start == 1){
			$scope.sunChiefItems = bodyTemp;
			$ionicScrollDelegate.$getByHandle('sunChief').scrollTop();
		}else{
			$scope.sunChiefItems = $scope.sunChiefItems.concat().concat(bodyTemp);
		}
		$scope.isFetching = false;
		$scope.$broadcast('scroll.refreshComplete');
		$scope.$broadcast('scroll.infiniteScrollComplete');
	};

	var getSunChiefItemsHud = function (param) {
		if($scope.isFetching) return;
		$scope.isFetching = true;
		$scope.showHud();
		NewsLetterService.getSunChiefItems(param, true)
			.success(function(data){
				$scope.hideHud();
				$scope.chiefSucCallBack(data, param);
             })
             .error(function(data){
             	$scope.hideHud();
             	$scope.sunOver = false;
             	$scope.isFetching = false;
				$scope.$broadcast('scroll.refreshComplete');
				$scope.$broadcast('scroll.infiniteScrollComplete');
             });
	};

	//绍兴阳光政务进入页面默认执行的方法
	var getSunChiefItems = function (param) {
		if($scope.isFetching) return;
		$scope.isFetching = true;
		NewsLetterService.getSunChiefItems(param, true)
			.success(function(data){
				$scope.chiefSucCallBack(data, param);
             })
             .error(function(data){
             	$scope.sunOver = false;
             	$scope.isFetching = false;
				$scope.$broadcast('scroll.refreshComplete');
				$scope.$broadcast('scroll.infiniteScrollComplete');
             });
	};
	
	//设置一个布尔值来控制tab的样式切换
	$scope.isHave = false;
	//定义一个全局变量来记录当前的tab
	var tabStr = '0';
	NewsLetterService.activeTab = '0';
	//组合查询参数(tab为0时表示进入指定页默认查询的tab分类)
	var param = {start:1, limit:20, typeID:tabStr,title:''};     //默认查询的是企业版并且非模糊查询
	//系统初始化将查询一遍阳光政务列表
	getSunChiefItemsHud(param); 
	$scope.listenH5Event('app_sunChief');
	
	//切换tab选项时切换结果集
	$scope.changeTab = function(tab){ 
		NewsLetterService.activeTab = tab+'';
		if(tab == 0){
			tabStr = '0';
			$scope.activeTab = '企业版';
			$scope.isHave = false;
		}else{	
			tabStr = '1';
			$scope.activeTab = '个人版';
			$scope.isHave = true;	
		}
		//组合查询参数
		var param = {start:1, limit:20, typeID:tab,title:''};
		//根据传递过来的类型tab去检索对应的数据	
		getSunChiefItemsHud(param);
	};

	//上滑刷新事件
	$scope.getNextPageSunChief = function(){
		var start = '1';
		if($scope.nextIndex){
			start = $scope.nextIndex;
		}
		//组合查询参数
		var param = {start:start, limit:20, typeID:tabStr,title:''};
		//根据传递过来的类型tab去检索对应的数据	
		getSunChiefItems(param);
	}
}]
);