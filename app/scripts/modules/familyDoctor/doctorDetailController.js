'use strict';
angular.module('RstFrontH5')
.controller('doctorDetailController',
['$scope', '$ionicActionSheet', '$state', '$ionicPopup', 'familyDoctorService', 'ApiService',
function($scope, $ionicActionSheet, $state, $ionicPopup, fds, as) {
	$scope.isIntroCpt = false;
	$scope.isChange = fds.isChange;

	$scope.historyBack = function(){
		if(fds.isFromList || fds.isFromSearch){
			history.go(-1);
			fds.isFromList = fds.isFromSearch = false;
		}else {
			as.backToHome();
			fds.isChange = false;
		}
	};

//	$scope.showChange = function(){
//		if($scope.hasChangeTime){
//			fds.isChange = true;
//			$state.go('app.familyDoctor');
//		}else {
//			$scope.nativeTip('您今年已更换过两位医生');
//		}
//	};
	
	$scope.showChange = function(){
		if($scope.hasChangeTime){
			fds.isChange = true;
			$state.go('app.familyDoctor', {doctorCode: $scope.doctorCode});
		}else {
			$scope.nativeTip('您今年已更换过两位医生');
		}
	};
	
	$scope.initDetail = function(){
		var params = $state.params;
		$scope.doctorCode = params.doctorCode;
		$scope.getDoctor($scope.doctorCode);
		if(fds.signDoctorCode){
			$scope.isSign = !!fds.signDoctorCode;
			$scope.isMyDoctor = $scope.doctorCode===fds.signDoctorCode;
		}else {
			if(!as.isLocalEnv() && $$ && typeof($$.Native)!=='undefined'){
				$$.Native.getLocalData({name:'doctorCode', callback:function(code){
					if(code){
						fds.signDoctorCode = code;
						$scope.isSign = !!fds.signDoctorCode;
						$scope.isMyDoctor = $scope.doctorCode===fds.signDoctorCode;
					}
				}});
			}
		}
		
		$scope.listenH5Event('app_doctorDetail');
	};
	
	$scope.getDoctor = function(code){
		$scope.showHud();
		fds.getDoctor({doctorCode: code}, true)
			.success(function(rsp){
				var body = rsp.body;
				if(body){
					if(body.intro && body.intro.length > 28) {
						$scope.isIntroCpt = true;
						body.introBrief = body.intro.substring(0,28) + '...';
					}
					$scope.hasChangeTime = body.changeTimes;
					body.portrait = body.sex==='F' ? 'images/female.png' : 'images/male.png';
					var dep = body.department,
						lev = body.jobTitle;
					if(dep && lev){
						body.deplev = dep+'-'+lev;
					}else if(dep || lev){
						body.deplev = dep||lev;
					}
					fds.modelDoctor = body;
					$scope.modelDoctor = body;
				}else {
				}
				$scope.hideHud();
			})
			.error(function(){
				$scope.hideHud();
			});
	};
	
	$scope.signDoctor = function(type){
		var ct = $scope.modelDoctor.changeTimes,
			//msg = type==='sign'?('签约后，今年还可更换'+ct+'位医生，是否确定签约？'):('今年还可更换'+ct+'位医生，是否确定更换？');
		msg = type==='sign'?('您现在要签约'+$scope.modelDoctor.name+'医生为您的家庭医生，注意：签约成功后每年只能更换2次，您还能更换'+ct+'次'):('今年还可更换'+ct+'位医生，是否确定更换？');
		 
		$scope.nativeConfirm({
			text: msg,
			leftBtnText: '我再看看',
			rightBtnText: '是',
			rightBtnCallback: function(){
				$scope.showHud();
				fds.setSign({doctorCode: $scope.doctorCode}, true)
					.success(function(rsp){
						if(rsp && rsp.body){
							var act = rsp.body.action;
							if(rsp.code === 10000){
								fds.signDoctorCode = $scope.doctorCode;
								$state.go('app.signSuccess',{actCode:act});
								if(!as.isLocalEnv() && $$ && typeof($$.Native)!=='undefined'){
									$$.Native.setLocalData({name:'doctorCode', value:$scope.doctorCode});
								}
							}else if(act === '3') {//0签约成功，1变更成功，2一年只能变更2次，3该家庭医生签约次数已满
								$scope.autoSign();
							}else {
								$scope.nativeTip({text: rsp.message});
							}
						}else {
						}
						$scope.hideHud();
					})
					.error(function(){
						$scope.hideHud();
					});
			}
		});
		
		$scope.listenH5Event('app_doctorDetail_signDoctor');
	};
	
	$scope.autoSign = function(){
		$scope.nativeConfirm({
			text: '该医生现有150位签约用户，已达到可签约人数上限，是否让系统自动为您匹配医生？',
			leftBtnText: '自动匹配',
			rightBtnText: '查找医生',
			leftBtnCallback: function(){
				$scope.showHud();
				fds.autoSign(true)
					.success(function(rsp){
						$scope.hideHud();
						if(rsp.code === 10000){
							fds.signDoctorCode = $scope.doctorCode;
							$state.go('app.signSuccess', {autoSign:true});
							if(!as.isLocalEnv() && $$ && typeof($$.Native)!=='undefined'){
								$$.Native.setLocalData({name:'doctorCode', value:$scope.doctorCode});
							}
						}else {
							$scope.nativeTip({text: rsp.message||'签约失败'});
						}
					})
					.error(function(){
						$scope.hideHud();
					});
			},
			rightBtnCallback: function(){
				$state.go('app.familyDoctor');
			}
		});
		
		$scope.listenH5Event('app_doctorDetail_autoSignDoctor');
	};
}]
);