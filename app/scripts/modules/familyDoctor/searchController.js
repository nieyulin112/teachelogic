'use strict';
angular.module('RstFrontH5')
.controller('searchController', ['$scope' , '$state', '$ionicScrollDelegate', '$ionicPopup', 'familyDoctorService', 
function($scope, $state,$ionicScrollDelegate, $ionicPopup, fds){
	$scope.isRecmd = false;
	$scope.isDefault = false;
	$scope.nameItem = [];
	$scope.showSearchDoc = false;
	$scope.changeText = '取消';
	$scope.searchMore = false;
	
	$scope.clearKey = function(){
		document.getElementById('searchWord').value = '';
		$scope.isRecmd = false;
	};
	
	$scope.searchKeyUp = function(event){
		$scope.searchKey = document.getElementById('searchWord').value;
		$scope.getHistory();
		if(event.keyCode===13){
			$scope.getByKey();
		}
	};
	
	$scope.searchDoctorHistory = function(){
		var keys = localStorage.doctorKeys;
		if(keys){
			var his = [];
			keys = JSON.parse(keys);
			for(var i=0;i<keys.length;i++){
				var item = keys[i];
					item.keyValue =item.value;
					item.id = item.id;
					his.push(item);
			}
			$scope.isRecmd = true;
			$scope.storeSearch = his;
		}
	}
	
	$scope.addHistory = function(){
		var sk = $scope.searchKey,
			keys = localStorage.doctorKeys;
		if(!sk) return;
		if(keys){
			keys = JSON.parse(keys);
			var hasKey = false;
			for(var i=0;i<keys.length;i++){
				if(keys[i].value === sk){
					hasKey = true;
					keys[i].id = new Date().getTime();
					break;
				}
			}
			if(!hasKey){
				keys.push({id:new Date().getTime(), value:sk});
			}
			localStorage.doctorKeys = JSON.stringify(keys);
		}else {
			localStorage.doctorKeys = JSON.stringify([{id:new Date().getTime(), value:sk}]);
		}
	};
	
	$scope.getHistory = function(){
		var sk = $scope.searchKey,
			keys = localStorage.doctorKeys,
			his = [];
		if(sk && keys){
			keys = JSON.parse(keys);
			for(var i=0;i<keys.length;i++){
				var item = keys[i];
				if(item.value.indexOf(sk) >= 0){
					item.keyValue = item.value.replace(sk, '<span class="search_color">'+sk+'</span>');
					his.push(item);
				}
			}
			$scope.storeSearch = his;
			if(his.length && !$scope.isRecmd){
				$scope.isRecmd = true;
			}else if(!his.length){
				$scope.isRecmd = false;
			}
		}else {
			$scope.isRecmd = false;
		}
	};
	
	$scope.historyItem = function(item){
		document.getElementById('searchWord').value = item.value;
		$scope.getByKey();
	};
	
	$scope.clearHistory = function(){
		$scope.storeSearch = [];
		localStorage.removeItem('doctorKeys');
		$scope.isRecmd = false;
	};
	
	$scope.getByKey = function(){
		$scope.searchKey = document.getElementById('searchWord').value;
		if($scope.searchKey){
			$scope.params = {start:1, type:1, limit:20, name:$scope.searchKey};
			$scope.isRecmd = false;
			$scope.isDefault = true;
			$scope.getAllHud($scope.params);
			$scope.addHistory();
		}
	}
	
	$scope.searchSucCallBack = function(data, params){
		if(data.body && data.body.length){
        		for(var i=0; i<data.body.length; i++){
				data.body[i].portrait = data.body[i].sex==='F' ? 'images/female.png' : 'images/male.png';
			};
        		if(params.start === 1){
				$scope.storeAll = data.body;
				$ionicScrollDelegate.$getByHandle('searchDocScroll').scrollTop();
			}else {
				$scope.storeAll = $scope.storeAll.concat().concat(data.body);
			}
    			$ionicScrollDelegate.$getByHandle('searchDocScroll').resize();
    			$scope.searchMore = data.body.length >= params.limit;//当数据的长度大于限制的长度时，加载下一页
			params.start=params.start + params.limit;
		}else {
			if(params.start === 1){
				$scope.showSearchDoc = true;
				$scope.storeAll=[];
			}
			$scope.searchMore = false;	
		}
		$scope.isFetching = false;
		$scope.$broadcast('scroll.refreshComplete');
		$scope.$broadcast('scroll.infiniteScrollComplete');
	};
	
	$scope.getAllHud = function(params){
	    if($scope.isFetching) return;
	    $scope.isFetching = true;
	 	fds.getAll(params)
        .success(function(data){
        		$scope.searchSucCallBack(data, params);
        })
        .error(function(){
            	$scope.isFetching = false;
            	$scope.searchMore = false;
            	$scope.$broadcast('scroll.refreshComplete');
			$scope.$broadcast('scroll.infiniteScrollComplete');
        });   
	};
	
	$scope.getAll = function(params){
	    if($scope.isFetching) return;
	    $scope.isFetching = true;
	 	fds.getAll(params, true)
        .success(function(data){
        		$scope.searchSucCallBack(data, params);
        })
        .error(function(){
	        	$scope.isFetching = false;
	        	$scope.searchMore = false;
	        	$scope.$broadcast('scroll.refreshComplete');
			$scope.$broadcast('scroll.infiniteScrollComplete');
        });   
	};
	
	$scope.detail=function(doctorCode){
		fds.isFromSearch = true;
		$state.go('app.doctorDetail',{doctorCode:doctorCode});
	};
	
	$scope.listenH5Event('app_search');
}]);
