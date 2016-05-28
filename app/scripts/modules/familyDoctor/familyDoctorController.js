'use strict';
angular.module('RstFrontH5')
.controller('familyDoctorController',
['$scope', '$ionicActionSheet', '$ionicScrollDelegate', '$state', '$ionicPopup','$stateParams', 'localStorageService', 'familyDoctorService', 'ApiService',
function($scope, $ionicActionSheet, $ionicScrollDelegate, $state, $ionicPopup,$stateParams, localStorageService, fds, as) {
	$scope.limit = 20;
	$scope.recmdStart = 1;
	$scope.allStart = 1;
	$scope.hosStart = 1;
	$scope.allParam = {type:1, limit:$scope.limit};
	
	$scope.recmdMore = false;
	$scope.allMore = false;
	$scope.isRecmd = true;
	$scope.isDefault = false;
	$scope.isHospital = false;
	$scope.sltHospital = '按医院';
	$scope.sltSubject = '按科室';
	$scope.storeHospital = [];
	
//	$scope.backHome = function(){
//		$scope.backToHome();
//		fds.isChange = false;
//	};
	
	$scope.backHome = function(){
		if($stateParams.doctorCode){
			$state.go('app.doctorDetail', {doctorCode: $stateParams.doctorCode});
			fds.isChange = false;
		}else if($stateParams.doctorCode === ""){
			$scope.backToHome();
			fds.isChange = false;
		}
	};

	
	
	$scope.initFamilyDoctor = function(){
		$scope.getRecmdHud($scope.recmdStart);
	};
	
	$scope.recmdSucCallBack = function(rsp, start){
		var body = rsp.body;
		if(rsp && rsp.code===fds.success){
			if(body.errorCode==='1'){// 没有绑定社保卡
				$scope.recmdMore = false;
				$scope.nativeTip(rsp.message);
			}else{
				if(body.length){
					for(var i=0; i<body.length; i++){
						body[i].portrait = body[i].sex==='F' ? 'images/female.png' : 'images/male.png';
						//body[i].portrait = body[i].portrait||'images/doctor-default.png';
						var dep = body[i].department,
							lev = body[i].jobTitle;
						if(dep && lev){
							body[i].deplev = dep+'-'+lev;
						}else if(dep || lev){
							body[i].deplev = dep||lev;
						}
					}
					if(start === 1){
						$scope.storeRecmd = body;
						$ionicScrollDelegate.$getByHandle('recmdScroll').scrollTop();
					}else {
						$scope.storeRecmd = $scope.storeRecmd.concat().concat(body);
					}
					$ionicScrollDelegate.$getByHandle('recmdScroll').resize();
					$scope.recmdStart = start + $scope.limit;
					$scope.recmdMore = body.length >= $scope.limit;
				}else {
					$scope.storeRecmd = [];
					$scope.recmdMore = false;
					if(start === 1){
						$scope.isCmdEmpty = true;
					}
				}
			}
		}else {
			$scope.recmdMore = false;
		}
		$scope.isFetching = false;
		$scope.$broadcast('scroll.refreshComplete');
		$scope.$broadcast('scroll.infiniteScrollComplete');
	};
	
	$scope.getRecmdHud = function(start){
		if($scope.isFetching) return;
		$scope.isCmdEmpty = false;
		$scope.isFetching = true;
		$scope.showHud();
		fds.getRecmd({start:start, limit:$scope.limit, type:0}, true)
			.success(function(rsp){
				$scope.hideHud();
				$scope.recmdSucCallBack(rsp, start);
			})
			.error(function(){
				$scope.hideHud();
				$scope.recmdMore = false;
				$scope.isFetching = false;
				$scope.$broadcast('scroll.refreshComplete');
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
	};
	
	$scope.getRecmd = function(start){
		if($scope.isFetching) return;
		$scope.isCmdEmpty = false;
		$scope.isFetching = true;
		fds.getRecmd({start:start, limit:$scope.limit, type:0}, true)
			.success(function(rsp){
				$scope.recmdSucCallBack(rsp, start);
			})
			.error(function(){
				$scope.recmdMore = false;
				$scope.isFetching = false;
				$scope.$broadcast('scroll.refreshComplete');
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
	};
	
	$scope.allSucCallBack = function(rsp, start){
		var body = rsp.body;
		if(rsp && rsp.code===fds.success){
			if(body.errorCode==='1'){// 没有绑定社保卡
				$scope.allMore = false;
				$scope.nativeTip(rsp.message);
			}else{
				if(body.length){
					$scope.allLoaded = true;
					for(var i=0; i<body.length; i++){
						body[i].portrait = body[i].sex==='F' ? 'images/female.png' : 'images/male.png';
						var dep = body[i].department,
							lev = body[i].jobTitle;
						if(dep && lev){
							body[i].deplev = dep+'-'+lev;
						}else if(dep || lev){
							body[i].deplev = dep||lev;
						}
					}
					if(start === 1){
						$scope.storeAll = body;
						$ionicScrollDelegate.$getByHandle('allScroll').scrollTop();
						fds.allFirstPage = body;
					}else {
						$scope.storeAll = $scope.storeAll.concat().concat(body);
					}
					$ionicScrollDelegate.$getByHandle('allScroll').resize();
					$scope.allMore = body.length >= $scope.limit;
					$scope.allStart = start + $scope.limit;
				}else {
					$scope.storeAll = [];
					$scope.isAllEmpty = true;
					$scope.allMore = false;
				}
			}
		}else {
			$scope.allMore = false;
		}
		$scope.isFetching = false;
		$scope.$broadcast('scroll.refreshComplete');
		$scope.$broadcast('scroll.infiniteScrollComplete');
	};
	
	$scope.getAllHud = function(start){
		if($scope.isFetching) return;
		$scope.isAllEmpty = false;
		$scope.isFetching = true;
		$scope.allParam.start = start;
		$scope.showHud();
		fds.getAll($scope.allParam, true)
			.success(function(rsp){
				$scope.hideHud();
				$scope.allSucCallBack(rsp, start);
			})
			.error(function(){
				$scope.hideHud();
				$scope.allMore = false;
				$scope.isFetching = false;
				$scope.$broadcast('scroll.refreshComplete');
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
	};
	
	$scope.getAll = function(start){
		if($scope.isFetching) return;
		$scope.isAllEmpty = false;
		$scope.isFetching = true;
		$scope.allParam.start = start;
		fds.getAll($scope.allParam, true)
			.success(function(rsp){
				$scope.allSucCallBack(rsp, start);
			})
			.error(function(){
				$scope.allMore = false;
				$scope.isFetching = false;
				$scope.$broadcast('scroll.refreshComplete');
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
	};
	
	$scope.getArea = function(){
		$scope.showHud();
		fds.getArea(true)
			.success(function(rsp){
				$scope.hideHud();
				var body = rsp.body;
				if(body && body.length){
					$scope.storeArea = body;
				}else {
					$scope.nativeTip(rsp.message);
				}
			})
			.error(function(){
				$scope.hideHud();
			});
	};
	
	$scope.showRecmd = function(){
		$scope.isRecmd = true;
		$scope.isDefault = false;
		$scope.isHospital = false;
		$scope.sltHospital = '按医院';
		$scope.sltSubject = '按科室';
	};
	
	$scope.showAll = function(){
		$scope.isRecmd = false;
		$scope.isDefault = true;
		$scope.isHospital = false;
		$scope.isSubject = false;
		$scope.sltHospital = '按医院';
		$scope.sltSubject = '按科室';
		delete $scope.lastSubName;
		delete $scope.lastHosName;
		delete $scope.sltHospitalCode;
		delete $scope.sltDepartmentCode;
		$scope.isGetSub = true;
		
		if($scope.allLoaded){
			delete $scope.allParam.hospitalCode;
			delete $scope.allParam.departmentCode;
			$scope.storeAll = fds.allFirstPage;
			$scope.allMore = $scope.storeAll.length >= $scope.limit;
			$scope.allStart = 1 + $scope.limit;
			$ionicScrollDelegate.$getByHandle('allScroll').scrollTop();
		}else {
			$scope.getAllHud(1);
		}
	};
	
	$scope.showHospital = function(){
		$scope.isRecmd = false;
		$scope.isSubject = false;
		$scope.sltSubject = $scope.lastSubName || '按科室';

		if(!$scope.isHospital){
			$scope.isDefault = false;
			$scope.isHospital = true;
			$scope.sltHospital = '按医院';
			if(!$scope.hasHosData){
				$scope.selectAreaHud(1);
			}
		}else {
			$scope.isDefault = true;
			$scope.isHospital = false;
			$scope.sltHospital = $scope.lastHosName || '按医院';
		}
	};
	
	$scope.showSubject = function(){
		$scope.isRecmd = false;
		$scope.isHospital = false;
		$scope.sltHospital = $scope.lastHosName || '按医院';
		
		if($scope.isSubject){
			$scope.isDefault = true;
			$scope.isSubject = false;
			$scope.sltSubject = $scope.lastSubName || '按科室';
		}else {
			$scope.isDefault = false;
			$scope.isSubject = true;
			$scope.sltSubject = '按科室';
			if($scope.isGetSub){
				$scope.getSubject();
				$scope.isGetSub = false;
			}
		}
	};
	
	$scope.getSubject = function(){
		$scope.showHud();
		fds.getSubject({hospitalCode:$scope.sltHospitalCode||''}, true)
			.success(function(rsp){
				$scope.hideHud();
				var body = rsp.body;
				if(body && body.length){
					$scope.storeSubject = body;
				}else {
					$scope.nativeTip(rsp.message);
				}
			})
			.error(function(){
				$scope.hideHud();
			});
	};
	
	$scope.hosSucCallBack = function(rsp, start){
		var body = rsp.body || [];
		if(body && body.length){
			$scope.storeHospital = start===1 ? body : $scope.storeHospital.concat().concat(body);
			$scope.hosMore = body.length >= $scope.limit;
			$scope.hosStart = start + $scope.limit;
			$ionicScrollDelegate.$getByHandle('hospitalScroll').resize();
		}else {
			$scope.hosMore = false;
			if(start === 1){
				$scope.isHosEmpty = true;
			}
		}
		$scope.isFetching = false;
		$scope.$broadcast('scroll.refreshComplete');
		$scope.$broadcast('scroll.infiniteScrollComplete');
	};
	
	$scope.selectAreaHud = function(start){
		if($scope.isFetching) return;
		$scope.isFetching = true;
		$scope.hosMore = false;
		$scope.isHosEmpty = false;
		$scope.showHud();
		fds.getHospital({start:start, limit:$scope.limit}, true)
			.success(function(rsp){
				$scope.hideHud();
				$scope.hosSucCallBack(rsp, start);
				$scope.hasHosData = true;
			})
			.error(function(){
				$scope.hideHud();
				$scope.hosMore = false;
				$scope.isFetching = false;
				$scope.$broadcast('scroll.refreshComplete');
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
	};
	
	$scope.selectArea = function(start){
		if($scope.isFetching) return;
		$scope.isFetching = true;
		$scope.hosMore = false;
		$scope.isHosEmpty = false;
		fds.getHospital({start:start, limit:$scope.limit}, true)
			.success(function(rsp){
				$scope.hosSucCallBack(rsp, start);
			})
			.error(function(){
				$scope.hosMore = false;
				$scope.isFetching = false;
				$scope.$broadcast('scroll.refreshComplete');
				$scope.$broadcast('scroll.infiniteScrollComplete');
			});
	};
	
	$scope.selectHospital = function(item){
		$scope.sltHospital = item.name;
		$scope.lastHosName = item.name;
		$scope.isRecmd = false;
		$scope.isDefault = true;
		$scope.isHospital = false;
		$scope.isGetSub = $scope.sltHospitalCode!==item.hospitalCode; 
		$scope.sltHospitalCode = item.hospitalCode;
		
		$scope.allParam.departmentCode = $scope.sltDepartmentCode || '';
		$scope.allParam.hospitalCode = item.hospitalCode; 
		$scope.getAllHud(1);
	};
	
	$scope.selectSubject = function(item){
		$scope.sltSubject = item.departmentName;
		$scope.lastSubName = item.departmentName;
		$scope.sltDepartmentCode = item.departmentCode;
		$scope.isRecmd = false;
		$scope.isDefault = true;
		$scope.isSubject = false;
		
		$scope.allParam.hospitalCode = $scope.sltHospitalCode || '';
		$scope.allParam.departmentCode = item.departmentCode;
		$scope.getAllHud(1);
	};
	
	$scope.showDetail = function(item){
		fds.isFromList = true;
		var timeIndex = new Date().getTime();//解决已经有预约的医生，返回问题
		$state.go('app.doctorDetail', {doctorCode: item.doctorCode,timeIndex:timeIndex});
	};
	
	$scope.listenH5Event('app_familyDoctor');
}]
);