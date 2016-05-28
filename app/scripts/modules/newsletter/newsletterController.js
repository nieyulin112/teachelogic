'use strict';
angular.module('RstFrontH5')
.controller('newsletterController',['$scope', '$state', '$stateParams','$ionicScrollDelegate', 'NewsLetterService', 
function($scope, $state, $stateParams,$ionicScrollDelegate,NewsLetterService) {
	
	$scope.newsOver=false;
	//接收menuType
	$scope.menuTypeNum = $stateParams.menuType;

	//声明header标题
	$scope.headerTitle = '';

    //根据进入资讯列表页时携带的menuType来动态显示header标题
    if ($scope.menuTypeNum === '1') {
    		NewsLetterService.nowPolicyModule = $scope.headerTitle = '社保政策';
    }else if ($scope.menuTypeNum === '2') {
    		NewsLetterService.nowPolicyModule = $scope.headerTitle = '办事指南';
    }else if ($scope.menuTypeNum === '3') {
    		NewsLetterService.nowPolicyModule = $scope.headerTitle = '就业招聘公示';
    }
	
	//是否有副标题的布尔值
	$scope.isTab = false;
	//接收menuType，方便在页面判断，选择显示的内容
	$scope.menuTypeNum = $stateParams.menuType;

	//计算返回的tabItem的长度(默认为0)
	var tabItemLength = 0;
	
	$scope.findBool = true;
	
	$scope.newsSucCallBack = function(data, param){
		var bodyTemp = data.body.dataList;
		var len = bodyTemp.length;
		//$scope.newsletterItems = data.body.dataList;
		if(len >= 20){//如果此次查询条数达到20条
			$scope.newsOver = true;
			$scope.nextIndex = len + param.start;   //让nextIndex跟着变动
			$scope.findBool = true;
		}else if(len == 0){  //如果没有检索到数据，则在页面提示
			$scope.findBool = false;
			$scope.newsOver = false;
		}else{
			$scope.newsOver = false;
			$scope.findBool = true;
		}
		if (param.isFind === true && data.body.tabItem.length>0) { 
			tabItemLength = data.body.tabItem.length;  //得到tabItem的长度
			if (param.info_type === '2') {   						
				//声明一个控制办事指南的tab样式切换的布尔值数组
				$scope.colors = [{tag:'全部',boolTab:false}];
				//通过循环然后组装数组
				for(var i = 0 ; i < tabItemLength ; i++ ) {
					$scope.colors.push({tag:data.body.tabItem[i].tag,boolTab:true});
				}
				$scope.tabItem = [{tag:'全部',tab:0, active:true}];
				for(var j = 0 ; j < tabItemLength ; j++ ) {
					$scope.tabItem.push({tag:data.body.tabItem[j].tag,tab:j+1, active:false});
				}
				$scope.nowActiveItem = $scope.tabItem[0];
				$scope.isTab = true;
			}else if(param.info_type === '1'){
				$scope.tabItem = [];
				$scope.isTab = false; 
			}else{
				$scope.tabItem = [];     						
				for(var k = 0 ; k < tabItemLength ; k++ ) {
					$scope.tabItem.push({tag:data.body.tabItem[k].tag,tab:k});
				}
				$scope.isTab = false; 
			}
			  
		}
		if(param.start == 1){        				
			$scope.newsletterItems = bodyTemp;
			$ionicScrollDelegate.$getByHandle('newsletter').scrollTop();
		}else{
			$scope.newsletterItems = $scope.newsletterItems.concat().concat(bodyTemp);
		}
		
		$scope.tab = param.tag;
		$scope.isFetching = false;
		$scope.$broadcast('scroll.refreshComplete');
		$scope.$broadcast('scroll.infiniteScrollComplete');
	};
	
	var getNewsletterItemsHud = function (param) {
//		if(param.info_type == 3 && param.tag == ''){
//			param.tag = '招聘信息';
//		}
		$scope.showHud();
		NewsLetterService.getNewsletterItems(param, true)
			.success(function(data){
				$scope.hideHud();
				$scope.newsSucCallBack(data, param);
             })
             .error(function(data){
             	$scope.hideHud();
             	$scope.newsOver = false;
             	$scope.isFetching = false;
				$scope.$broadcast('scroll.refreshComplete');
				$scope.$broadcast('scroll.infiniteScrollComplete');
             }); 
	};
	
	//实时通讯优化将(政策查询、办事指南)列表分页查询（附带副标题tab组）
	var getNewsletterItems = function (param) {
//		if(param.info_type == 3 && param.tag == ''){
//			param.tag = '招聘信息';
//		}
		NewsLetterService.getNewsletterItems(param, true)
			.success(function(data){
				$scope.newsSucCallBack(data, param);
             })
             .error(function(data){
             	$scope.newsOver = false;
             	$scope.isFetching = false;
				$scope.$broadcast('scroll.refreshComplete');
				$scope.$broadcast('scroll.infiniteScrollComplete');
             }); 
	};

	//组合查询参数(tab为0时表示进入指定页默认查询的tab分类)
	var param = {start:1, limit:20, info_type:$scope.menuTypeNum, tag:'', isFind:true};

	//系统初始化将查询一遍资讯列表
	getNewsletterItemsHud(param); 
	$scope.listenH5Event('app_newsletterPage');

	//设置副标题的布尔值控制样式
	$scope.isHave = false;

	//设置办事指南的tab比较值
	$scope.bsTab = 0;

	//切换tab选项时切换结果集
	$scope.changeTab = function(item){
		var tab = item.tag;
		if(!tab){
			tab = '';
		}
		//判断切换tab项改变样式
		if($scope.menuTypeNum == 2) {
			$scope.nowActiveItem.active = false;
			item.active = true;
			$scope.nowActiveItem = item;
			var temp = '';
			if(tab == '全部') {
				tab = '';
				temp = '全部';
			}
			for (var i = 0; i < $scope.colors.length; i++) {
				//重新初始化布尔值数组
				$scope.colors[i].boolTab = true;
				if ($scope.colors[i].tag === tab || $scope.colors[i].tag == temp) {  //使当前选中的tab
					$scope.colors[i].boolTab = false;
				}
			}
		}else if($scope.menuTypeNum == 1) {
				if(tab == 0){
					tab = '企业版';
					$scope.isHave = false;
				}else{
					tab = '个人版';
					$scope.isHave = true;
				}
				
		}else {
				if(tab == 0){
					tab = '招聘信息';
					$scope.isHave = false;
				}else{
					tab = '招考信息';
					$scope.isHave = true;
				}
				
		}
		//组合查询参数
		var param = {start:1, limit:20, info_type:$scope.menuTypeNum, tag:tab, isFind:false};
		//根据传递过来的类型tab去所有办事指南中筛选
		getNewsletterItemsHud(param);
	};
	
	$scope.getNextPageNewsletter = function(){
		var start = 1;
		if($scope.nextIndex){
			start = $scope.nextIndex;
		}
		//组合查询参数
		var param = {start:start, limit:20, info_type:$scope.menuTypeNum, tag:$scope.tab, isFind:false};
		//根据传递过来的类型tab去所有办事指南中筛选
		getNewsletterItems(param);
	}
	
}]
);