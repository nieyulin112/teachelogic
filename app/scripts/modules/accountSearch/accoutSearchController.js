/*
** author:nieyulin
** date:2015-11-06
** 账户查询
** 页面的逻辑
*/
'use strict';
angular.module('RstFrontH5')
	.controller('accountSearchController', ['$scope','$ionicGesture','$state','$ionicScrollDelegate','ApiService','accountSearchService',
	function($scope,$ionicGesture,$state,$ionicScrollDelegate,ApiService,accountSearchService) {
		$scope.limit = 10;
		$scope.accountStart = 0;
		$scope.accountMore = false;
		//加上小数点后两位
		var changeTwoDecimal = function(number){

	    		var f_x = parseFloat(number);
	    		if(isNaN(f_x)){
	    			return '-.--';
	    		}
	    		var f_x = Math.round(f_x*100)/100;
	    		var s_x = f_x.toString();
	    		var decial = s_x.indexOf('.');
	    		if(decial<0){
	    			decial = s_x.length;
	    			s_x += '.';
	    		}
	    		while(s_x.length<=decial+2){
	    			s_x += '0';
	    		}
	    		return s_x;
	    	};

	$scope.initAccountSearch = function(){
		$scope.getAccountHud();
		// 个人账户数据
		if(!ApiService.isLocalEnv() && typeof($$)!=='undefined' && typeof($$.Native)!=='undefined'){
			$$.Native.getLocalData({name:'zoneCode', callback:$scope.getAccountData});
		}else {
			$scope.getAccountData();
		}
	};

	$scope.getAccountHud =function(){
		var start = $scope.accountStart,
    			params = {start:start, limit:$scope.limit};
    		$scope.showHud();
    		accountSearchService.getRecordMoney(params, true)
			.success(function(data) {
				$scope.hideHud();
				if(!data.body){
					data.body = {};
				}
				if(!data.body.record){
					data.body.record = [];
				}
				if(data.body.record.length>0){
					var formatData = format(data.body.record);
			 		$scope.recordMoney = {record:formatData};
					$scope.recordMoney.record = formatByYear($scope.recordMoney.record);
					$ionicScrollDelegate.$getByHandle('accountScroll').scrollTop();
					$ionicScrollDelegate.$getByHandle('accountScroll').resize();
					$scope.accountStart = start + $scope.limit;
					$scope.accountMore = data.body.record.length >= $scope.limit;
				}else {
					$scope.accountMore = false;
					$scope.isEmpty = true;
				}
			}).error(function(data) {
				$scope.accountMore = false;
				ApiService.hideHud();
			});
    	};

    	//获取分页的详情数据
    	$scope.getAccount =function(start){
    		if(+start===0){
      		document.getElementById("fixAccountLabel").style.display="none";
    		}
    		if($scope.isFetching) return;
		$scope.isFetching = true;
    		var params = {start:start,limit:$scope.limit};
    		accountSearchService.getRecordMoney(params, true)
			.success(function(data) {
				if(!data.body){
					data.body = {};
				}
				if(!data.body.record){
					data.body.record = [];
				}
				if(data.body.record.length>0){
					var formatData = format(data.body.record);
				 	if(start === 0){
				 		$scope.recordMoney = {
							record:formatData
						};
						$ionicScrollDelegate.$getByHandle('accountScroll').scrollTop();
					}else{
						$scope.recordMoney.record = $scope.recordMoney.record.concat().concat(format(data.body.record));
					}
					$scope.recordMoney.record = formatByYear($scope.recordMoney.record);
					$ionicScrollDelegate.$getByHandle('accountScroll').resize();
					$scope.accountStart = start + $scope.limit;
					$scope.accountMore = data.body.record.length >= $scope.limit;
				}else {
					$scope.accountMore = false;
					if(start === 0){
						$scope.isEmpty = true;
					}
				}
				$scope.isFetching = false;
				$scope.$broadcast('scroll.refreshComplete');
				$scope.$broadcast('scroll.infiniteScrollComplete');
			}).error(function(data) {
				$scope.isFetching = false;
				$scope.accountMore = false;
				$scope.$broadcast('scroll.refreshComplete');
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
    	};

    	//获取zoneCode 判断账户查询无需分页的
    	$scope.getAccountData = function(zoneCode){
    		//初始化获取数据
    		$scope.ascZoneCode = zoneCode;
		if($state.current.name==='app.accountSearch'){
			$scope.showHud();
			accountSearchService.getRecordAccountMoney(true).success(function(data){
				$scope.hideHud();
				if(!data.body){
					data.body = {};
				}
				if($scope.ascZoneCode ==='0592'){
					$scope.col = 'col-30 text-right';
					$scope.col1 ='col-30 healthAccount';
					$scope.colSid = 'col-40';

					$scope.getRecordAccountMoney = {
						balance:changeTwoDecimal(data.body.balance),
						health:changeTwoDecimal(data.body.health),
						account:data.body.account,
						totalAdd:changeTwoDecimal(data.body.totalAdd),
						totalConsume:changeTwoDecimal(data.body.totalConsume)
					};
				}else{
					$scope.col = 'col-50 text-right';
					$scope.colSid = 'col-50';
					$scope.getRecordAccountMoney = {
						balance:changeTwoDecimal(data.body.balance),
						account:data.body.account,
						totalAdd:changeTwoDecimal(data.body.totalAdd),
						totalConsume:changeTwoDecimal(data.body.totalConsume)
					};
				}
			}).error(function(data){
				ApiService.hideHud();
			});
		}
	};

	$scope.showHud = function(){
		if(!$scope.isShowHud){
    			ApiService.showHud();
    			$scope.isShowHud = true;
    		}
	};
	
	$scope.hideHud = function(){
		if($scope.isHideHud){
			ApiService.hideHud();
			$scope.isHideHud = false;
			$scope.isShowHud = false;
		}else {
			$scope.isHideHud = true;
		}
	};

	//数据的展示和隐藏
	$scope.showHide = function(item) {
		if(!item.isExpanded){
			item.downup = 'ion-android-arrow-dropup-circle';
			item.isExpanded = true;
		}
		else{
			item.downup = 'ion-android-arrow-dropdown-circle';
			item.isExpanded = false;
		}
	};

	var formatByYear = function(newlist){
		var year = 0;
		for(var i = 0;i<newlist.length;i++){
 			var tempYear = newlist[i].date.substr(0,4);
			if(year != tempYear){
				year = tempYear;
				newlist[i].showYear = true
			}else{
				newlist[i].showYear = false;
			}
		}
		return newlist;
	}

	//数据格式化
	var format = function(list){
		var newlist = [];
 		if(list && list.length > 0) {
     		for(var i = 0;i<list.length;i++){
     			var rdate = new Date(list[i].date.replace(/-/g, '/'));
     			//有划入金额,且不为零的情况下拆成一条数据
	            if(list[i].amountInclude && list[i].amountInclude != '0.00') { // 划入金额
	            		if(!list[i].includedType){
	     				list[i].includedType = "划入金额";
	     			}
					var clone = JSON.parse(JSON.stringify(list[i]));
					//clone.dtype = '划入金额';
					clone.amountInclude = changeTwoDecimal(list[i].amountInclude);
					clone.personMoney = changeTwoDecimal(list[i].personMoney);
					clone.companyMoney = changeTwoDecimal(list[i].companyMoney);
					clone.date = list[i].date;
					delete clone.consumption;
					delete clone.healthAdd;
					//delete clone.date;
	                newlist.push(clone);
	            }
	            //有支出金额,且不为零的情况下拆成一条数据
	            if(list[i].consumption > 0 && list[i].consumption != '0.00') { // 消费金额
	            		if(!list[i].includedType || list[i].includedType==='划入金额'){ 
	     				list[i].includedType = "支出金额";
	     			}
	                var clone = JSON.parse(JSON.stringify(list[i]));
	                	//clone.dtype = '消费金额';
	                	clone.consumption = changeTwoDecimal(list[i].consumption);
					//clone.personMoney = list[i].personMoney.toFixed(2);
					//clone.companyMoney = list[i].companyMoney.toFixed(2);
					clone.date = list[i].date;
                 	delete clone.amountInclude;
                 	//delete clone.consumption;
                 	delete clone.healthAdd;
                 	//delete clone.date;
					newlist.push(clone);
	            }
	            //退费金额,且不为零的情况下拆成一条数据
	            if(list[i].consumption < 0 && list[i].consumption != '0.00') { // 消费金额
	           	 	if(!list[i].includedType || list[i].includedType==='划入金额'){ 
	     				list[i].includedType = "支出金额";
	     			}
	                var clone = JSON.parse(JSON.stringify(list[i]));
	                	//clone.dtype = '消费金额';
	                	clone.consumption = changeTwoDecimal(list[i].consumption);
						//clone.personMoney = list[i].personMoney.toFixed(2);
						//clone.companyMoney = list[i].companyMoney.toFixed(2);
						clone.date = list[i].date;
	                 	delete clone.amountInclude;
	                 	//delete clone.consumption;
	                 	delete clone.healthAdd;
	                 	//delete clone.date;
						newlist.push(clone);
	            }
	            //有健康账户金额,且不为零的情况下拆成一条数据
	            if (list[i].healthAdd && list[i].healthAdd != '0.00') { // 转入健康账户
	            		if(!list[i].includedType || list[i].includedType==='划入金额'){ 
	     				list[i].includedType = "支出金额";
	     			}
	                var clone = JSON.parse(JSON.stringify(list[i]));
	                //clone.dtype = '转入健康账户';
	                clone.healthAdd = changeTwoDecimal(list[i].healthAdd);
	                clone.date = list[i].date;
	                delete clone.amountInclude;
	                delete clone.consumption;
	                //delete clone.healthAdd;
	                //delete clone.date;
	                newlist.push(clone);
	            }            
     		}
 		}
 		return newlist;
	};
	
	var elementAccount = angular.element(document.querySelector('#accountScrollId'));

	$ionicGesture.on("dragdown",function(e){
	},elementAccount).on("touch",function(e){
		$scope.isScroll = true;
	},elementAccount).on("scroll",function(e){
		if($scope.isScroll){
			$scope.loopFindLI();
		}
	},elementAccount);
	
	$scope.loopFindLI = function(){
		var fixAccountLabel = document.getElementById("fixAccountLabel");
		var scrollTop = $ionicScrollDelegate.$getByHandle("accountScroll").getScrollPosition().top;
		if(scrollTop<=0){
			document.getElementById("fixAccountLabel").style.display="none";
		}
		var fixAccountHeight = ionic.DomUtil.getTextBounds(document.getElementById("fixAccountLabel")).top;
		var liCount = document.getElementsByClassName("customYearDivider");
		var liObj;
		for(var i=liCount.length-1;i>=0;i--){
			var temp = liCount[i];
			if(temp){
				var topHeight = ionic.DomUtil.getTextBounds(temp).top;
				if(+topHeight<155){
					liObj = temp;
					break;
				}
			}
		}
		if(liObj){
			var nodeText = liObj.children[0].children[0].innerText;
			document.getElementById("fixAccountSpan").innerText = nodeText;
			document.getElementById("fixAccountLabel").style.display="block";
		}
	};
	
}]);