'use strict';
angular.module('RstFrontH5')
.controller('drugExpenseController',
['$scope', '$state', '$ionicScrollDelegate', 'drugExpenseService', 'ApiService',
function($scope, $state, $ionicScrollDelegate, des, as) {
	
	$scope.initDrugExpense = function(){
		$scope.hotPageNum = $scope.drugPageNum = 1;
		$scope.getHot(1);
	};
	
	$scope.initDESearch = function(){
		$scope.getHistory();
	};
	
	$scope.btnAction = function(event){
		if(event.target.textContent === '搜索'){
			$scope.getDrugByKeyHud();
		}else {
			$scope.showDefault();
		}
	};
	
	$scope.showDefault = function(){
		$scope.isSearch = false;
		$scope.initDESearch();
		$scope.drugKey = '';
		$scope.clearKey();
	};
	
	$scope.drugKeyUp = function(event){
		$scope.drugKey = event.target.value;
		if(event.keyCode===13){
			$scope.getDrugByKeyHud();
		}
	};
	
	$scope.clearKey = function(){
		document.getElementById('de_drugSearch').value = '';
	};
	
	$scope.getHot = function(pageNum){
		if($scope.isFetching) return;
		$scope.isFetching = true;
		$scope.isHotEmpty = false;
		var param = {pageNum:pageNum, drugParam:''};
		des.getHot(param, true)
			.success(function(rsp){
				$scope.callBackGetHot(rsp, param);
			})
			.error($scope.errorCallBackHot);
	};
	
	$scope.callBackGetHot = function(rsp, param){
		if(rsp && rsp.code === $scope.rspState.success){
			var body = rsp.body || [];
			if(param.pageNum === 1){
				if(body.length){
					$scope.storeHot = body;
				}else {
					$scope.hotMore = false;
					$scope.storeHot = [];
					$scope.isHotEmpty = true;
				}
			}else {
				$scope.storeHot = $scope.storeHot.concat().concat(body);
			}
			$scope.hotMore = body.length >= $scope.reqParam.limit;
			$scope.hotPageNum = ++param.pageNum;
		}else {
			$scope.hotMore = false;
		}
		$scope.defaultCallBack();
	};
	
	$scope.getDrugByKeyHud = function(){
		console.log('sss');
		if($scope.isFetching) return;
		clearTimeout($scope.timeoutId);
		var keyWord = document.getElementById('de_drugSearch').value,
			param = {pageNum:1, drugParam:keyWord};
		if(!keyWord) return;
		$scope.isEmpty = false;
		$scope.keyWord = keyWord;
		$scope.isFetching = true;
		$scope.isSearch = true;
		
		des.getDrugByKey(param)
			.success(function(rsp){
				$scope.callBackGetDrug(rsp, param);
			})
			.error($scope.errorCallBack);
		
		$scope.isHistory = false;
		$scope.isSearch = true;
		// $scope.addHistory();
	
	};
	
	$scope.getDrugByKey = function(pageNum){
		if($scope.isFetching) return;
		if(!$scope.keyWord){
			$scope.defaultCallBack();
			return;
		};
		var param = {pageNum:pageNum, drugParam:$scope.keyWord};

		$scope.isFetching = true;
		
		des.getDrugByKey(param, true)
			.success(function(rsp){
				$scope.callBackGetDrug(rsp, param);
			})
			.error($scope.errorCallBack);
	};
	
	$scope.callBackGetDrug = function(rsp, param){
		if(rsp && rsp.code === $scope.rspState.success){
			var body = rsp.body || [];
			if(body.length){
				for(var i in body){
					var item = body[i];
					item.searchName = item.drugName.replace($scope.keyWord, '<span class="de_imptText">'+$scope.keyWord+'</span>')
				}
			}
			if(param.pageNum === 1){
				if(body.length){
					$scope.storeDrug = body;
				}else {
					$scope.storeDrug = [];
					$scope.isEmpty = true;
				}
			}else {
				$scope.storeDrug = $scope.storeDrug.concat().concat(body);
			}
			$scope.drugMore = body.length > 0 ? true : false;
			$scope.drugPageNum = ++param.pageNum;
		}else {
			$scope.drugMore = false;
		}
		$scope.defaultCallBack();
	};
	
	$scope.defaultCallBack = function(){
		$scope.isFetching = false;
		$scope.$broadcast('scroll.refreshComplete');
		$scope.$broadcast('scroll.infiniteScrollComplete');
	};
	
	$scope.errorCallBack = function(){
		$scope.drugMore = false;
		$scope.isFetching = false;
		$scope.$broadcast('scroll.refreshComplete');
		$scope.$broadcast('scroll.infiniteScrollComplete');
	};
	
	$scope.errorCallBackHot = function(){
		$scope.hotMore = false;
		$scope.isFetching = false;
		$scope.$broadcast('scroll.refreshComplete');
		$scope.$broadcast('scroll.infiniteScrollComplete');
	};
	
	$scope.addHistory = function(searchDrugName){
		var local = JSON.parse(localStorage.getItem('de_drugHistory') || '[]'),
			newLocal = [],
			newName = searchDrugName || $scope.keyWord;
		if(local.length){
			for(var i in local){
				var item = local[i];
				if(item.drugName !== newName){
					newLocal.push(item);
				}
			}
		}
		newLocal.push({id:new Date().getTime(), drugName:newName});
		localStorage.setItem('de_drugHistory', JSON.stringify(newLocal.slice(-5)));
	};
	
	$scope.getHistory = function(){
		$scope.storeHistory = JSON.parse(localStorage.getItem('de_drugHistory') || '[]');
	};
	
	$scope.clearHistory = function(){
		localStorage.removeItem('de_drugHistory');
		$scope.getHistory();
	};
	
	$scope.goDrugDetail = function(item){
		des.currentItem = item;
		$state.go('app.drugExpenseDetail', {drugCode:item.drugId});
		$scope.addHistory(item.drugName);
	};
	
	$scope.goSearch = function(item){
		var drugName = item.drugName;
		document.getElementById('de_drugSearch').value = drugName;
		$scope.getDrugByKeyHud();
	};
	
	$scope.inputChange = function(){
		if($scope.timeoutId){
			clearTimeout($scope.timeoutId);
		}
		$scope.timeoutId = setTimeout(function(){
			$scope.getDrugByKeyHud();
		}, 1000);
	}

	$scope.listenH5Event('app_drugExpense');
}]
);