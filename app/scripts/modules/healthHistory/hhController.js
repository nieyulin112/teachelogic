'use strict';
angular.module('RstFrontH5')
.controller('healHisController',
['$scope', '$state', '$ionicPopup', '$ionicScrollDelegate', '$filter', 'healHisService', 'ApiService',
function($scope, $state, $ionicPopup, $ionicScrollDelegate, $filter, hhs, as) {
	//初始化健康数据
	$scope.initHealHis = function(){
		$scope.cutYear = '';
		$scope.getSift();
		$scope.hisPageNum = 1;
		$scope.getDisHis();
	};
	//医疗档案和健康数据
	$scope.showHealHis = function(){
		$scope.isShowSift = false;
		$scope.isHealManage = false;
	};
	//健康数据的展示
	$scope.showHealMag = function(){
		$scope.isHealManage = true;
		if(!hhs.healMagInit){
			hhs.healMagInit = true;
			$scope.initInputDate();
			$scope.isBloodPre = true;
			$scope.initHealMag();
		}
	};
	//输入数据日期的获取
	$scope.initInputDate = function(){
		$scope.inDateBloodPre = $scope.inDateHeartRate = $scope.inDateWeight = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm');
		$scope.inDateBPDel = $scope.inDateHRDel = $scope.inDateWDel = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
	};
	//初始化健康消息数据
	$scope.initHealMag = function(){
		$scope.bpPageNum = 1;
		$scope.getBloodPreFirst();
		$scope.hrPageNum = 1;
		$scope.getHeartRateFirst();
		$scope.wPageNum = 1;
		$scope.getWeightFirst();
		$scope.defaultHealMagVal();
	};

	$scope.getSift = function(){
		hhs.getSift(true)
			.success(function(rsp){
				if(rsp.code === $scope.rspState.success){
					var body = rsp.body,
						newDisease = [],
						nowYear = new Date().getFullYear();
					if(body.modes && body.modes.length && body.modes[0].name==='全部'){
						body.modes.shift();
					}
					$scope.storeType = body.modes || [];

					if(body.diseases && body.diseases.length){
						var isHas0 = false;
						body.diseases.forEach(function(item){
							if(item.diseaseName && item.diseaseName != '0'){
								newDisease.unshift(item);
							}else {
								isHas0 = true;
							}
						});
						if(isHas0){
							newDisease.push({diseaseName:'其它'});
						}
					}else {
						newDisease = [{diseaseName:'其它'}];
					}
					$scope.storeDisease = newDisease;

					var healHisYears = body.years || [],
						nowYearsAry = [nowYear+'', nowYear-1+'', nowYear-2+''],
						otherYears = '';
					healHisYears.forEach(function(val){
						if(nowYearsAry.indexOf(val)===-1){
							otherYears += (val+',');
						}
					});

					$scope.storeTime = [
						{timeName:nowYear+'年', timeVal:nowYear},
						{timeName:nowYear-1+'年', timeVal:nowYear-1},
						{timeName:nowYear-2+'年', timeVal:nowYear-2},
						{timeName:'更多', timeVal:otherYears.substring(0,otherYears.length-1)},
					];
				}
			})
			.error(function(){
				$scope.nativeTip($scope.errorMsg);
			});
	};

	$scope.changeSiftState = function(){
		$scope.isShowSift = !$scope.isShowSift;
	};

	$scope.resetSift = function(){
		$scope.storeType.forEach(function(item){item.isActive = false;});
		$scope.storeTime.forEach(function(item){item.isActive = false;});
		$scope.storeDisease.forEach(function(item){item.isActive = false;});
	};

	$scope.siftHealHis = function(){
		$scope.changeSiftState();
		var typeSift = '',
			timeSift = '',
			diseaseSift = '';
		$scope.storeType.forEach(function(item){
			if(item.isActive){
				typeSift += (item.code+',');
			}
		});
		typeSift = typeSift.substring(0, typeSift.length-1);

		$scope.storeTime.forEach(function(item){
			if(item.isActive){
				timeSift += (item.timeVal+',');
			}
		});
		timeSift = timeSift.substring(0, timeSift.length-1);

		$scope.storeDisease.forEach(function(item){
			if(item.isActive){
				diseaseSift += ((item.diseaseName==='其它'?'0':item.diseaseName)+',');
			}
		});
		diseaseSift = diseaseSift.substring(0, diseaseSift.length-1);

		$scope.siftParam = {};
		if(typeSift){
			$scope.siftParam.modes = typeSift;
		}
		if(timeSift){
			$scope.siftParam.years = timeSift;
		}
		if(diseaseSift){
			$scope.siftParam.diseaseNames = diseaseSift;
		}

		$scope.hisPageNum = 1;
		$scope.cutYear = '';
		$scope.getDisHis();
	};

	$scope.getDisHis = function(){
		if($scope.isFetching) return;
		$scope.isFetching = true;
		var param = $scope.siftParam || {};
		param.pageNum = $scope.hisPageNum;
		$scope.isHisEmpty = false;
		hhs.getDisHis(param, true)
			.success(function(rsp){
				$scope.callBackGetHis(rsp, param);
			})
			.error($scope.errorCallBack);
	};

	$scope.callBackGetHis = function(rsp, param){
		if(rsp && rsp.code === $scope.rspState.success){
			var body = rsp.body.records;
			var cutYear = $scope.cutYear || '';
			for(var i in body){
				var item = body[i],
					disDate = item.visitDate,
					disYear = disDate.substr(0,4);
				if(disYear !== cutYear){
					item.disYear = cutYear = $scope.cutYear = disYear;
				}
				item.shortDate = disDate.substr(4,2)+'-'+disDate.substr(6,2);
				if(item.visitAmount){
					item.visitAmount = parseFloat(item.visitAmount).toFixed(2);
				}
			}
			$scope.hhTotal = parseFloat(rsp.body.expenses.total||0).toFixed(2);
			if(param.pageNum === 1){
				if(body.length){
					$scope.storeHis = body;
				}else {
					$scope.storeHis = [];
					$scope.isHisEmpty = true;
				}
				$ionicScrollDelegate.$getByHandle('hh_hisScroll').scrollTop();
			}else {
				$scope.storeHis = $scope.storeHis.concat().concat(body);
			}
			$scope.hisMore = body.length >= $scope.reqParam.limit;
			$scope.hisPageNum++;
			$ionicScrollDelegate.$getByHandle('hh_hisScroll').resize();
		}else {
			$scope.hisMore = false;
		}
		$scope.defaultCallBack();
	};

	$scope.defaultCallBack = function(){
		$scope.isFetching = false;
		$scope.$broadcast('scroll.refreshComplete');
		$scope.$broadcast('scroll.infiniteScrollComplete');
	};

	$scope.errorCallBack = function(){
		$scope.hisMore = false;
		$scope.isFetching = false;
		$scope.$broadcast('scroll.refreshComplete');
		$scope.$broadcast('scroll.infiniteScrollComplete');
	};

	$scope.activeSiftItem = function(item){
		item.isActive = !item.isActive;
	};

	$scope.getBloodPreFirst = function(){
		$scope.isBloodPreEmpty = false;
		var param = {pageNum:$scope.bpPageNum, filter:1};
		hhs.getBloodPre(param, true)
			.success(function(rsp){
				$scope.bloodPreCallBack(rsp, param);
			})
			.error(function(){
				$scope.bpMore = false;
				$scope.defaultCallBack();
			});
	};

	$scope.getBloodPre = function(){
		if($scope.isFetching) return;
		$scope.isFetching = true;
		var param = {pageNum:$scope.bpPageNum, filter:1};
		hhs.getBloodPre(param, true)
			.success(function(rsp){
				$scope.bloodPreCallBack(rsp, param);
			})
			.error(function(){
				$scope.bpMore = false;
				$scope.defaultCallBack();
			});
	};

	$scope.bloodPreCallBack = function(rsp, param){
		if(rsp.code === $scope.rspState.success){
			var body = rsp.body || [];
			if(body.length){
				for(var i in body){
					var item  = body[i];
					item.inputDateFormat = +new Date(item.inputDate.replace(/-/g,'/'));
				}
			}
			if(param.pageNum === 1){
				if(body.length){
					$scope.storeBloodPre = body;
				}else {
					$scope.storeBloodPre = [];
					$scope.isBloodPreEmpty = true;
				}
				$ionicScrollDelegate.$getByHandle('hh_bloodPreScroll').scrollTop();
			}else {
				$scope.storeBloodPre = $scope.storeBloodPre.concat().concat(body);
			}
			$scope.bpMore = body.length >= $scope.reqParam.limit;
			$scope.bpPageNum++;
			$ionicScrollDelegate.$getByHandle('hh_bloodPreScroll').resize();
		}else {
			$scope.bpMore = false;
		}
		$scope.defaultCallBack();
	};

	$scope.getHeartRateFirst = function(){
		$scope.isHeartRateEmpty = false;
		var param = {pageNum:$scope.hrPageNum, filter:2};
		hhs.getBloodPre(param, true)
			.success(function(rsp){
				$scope.heartRateCallBack(rsp, param);
			})
			.error(function(){
				$scope.hrMore = false;
				$scope.defaultCallBack();
			});
	};

	$scope.getHeartRate = function(){
		if($scope.isFetching) return;
		$scope.isFetching = true;
		var param = {pageNum:$scope.hrPageNum, filter:2};
		hhs.getBloodPre(param, true)
			.success(function(rsp){
				$scope.heartRateCallBack(rsp, param);
			})
			.error(function(){
				$scope.hrMore = false;
				$scope.defaultCallBack();
			});
	};

	$scope.heartRateCallBack = function(rsp, param){
		if(rsp.code === $scope.rspState.success){
			var body = rsp.body || [];
			if(body.length){
				for(var i in body){
					var item  = body[i];
					item.inputDateFormat = +new Date(item.inputDate.replace(/-/g,'/'));
				}
			}
			if(param.pageNum === 1){
				if(body.length){
					$scope.storeHeartRate = body;
				}else {
					$scope.storeHeartRate = [];
					$scope.isHeartRateEmpty = true;
				}
				$ionicScrollDelegate.$getByHandle('hh_heartRateScroll').scrollTop();
			}else {
				$scope.storeHeartRate = $scope.storeHeartRate.concat().concat(body);
			}
			$scope.hrMore = body.length >= $scope.reqParam.limit;
			$scope.hrPageNum++;
			$ionicScrollDelegate.$getByHandle('hh_heartRateScroll').resize();
		}else {
			$scope.hrMore = false;
		}
		$scope.defaultCallBack();
	};

	$scope.getWeightFirst = function(){
		$scope.isWeightEmpty = false;
		var param = {pageNum:$scope.wPageNum, filter:3};
		hhs.getBloodPre(param, true)
			.success(function(rsp){
				$scope.weightCallBack(rsp, param);
			})
			.error(function(){
				$scope.wMore = false;
				$scope.defaultCallBack();
			});
	};

	$scope.getWeight = function(){
		if($scope.isFetching) return;
		$scope.isFetching = true;
		var param = {pageNum:$scope.wPageNum, filter:3};
		hhs.getBloodPre(param, true)
			.success(function(rsp){
				$scope.weightCallBack(rsp, param);
			})
			.error(function(){
				$scope.wMore = false;
				$scope.defaultCallBack();
			});
	};

	$scope.weightCallBack = function(rsp, param){
		if(rsp.code === $scope.rspState.success){
			var body = rsp.body || [];
			if(body.length){
				for(var i in body){
					var item  = body[i];
					item.inputDateFormat = +new Date(item.inputDate.replace(/-/g,'/'));
				}
			}
			if(param.pageNum === 1){
				if(body.length){
					$scope.storeWeight = body;
				}else {
					$scope.storeWeight = [];
					$scope.isWeightEmpty = true;
				}
				$ionicScrollDelegate.$getByHandle('hh_weightScroll').scrollTop();
			}else {
				$scope.storeWeight = $scope.storeWeight.concat().concat(body);
			}
			$scope.wMore = body.length >= $scope.reqParam.limit;
			$scope.wPageNum++;
			$ionicScrollDelegate.$getByHandle('hh_weightScroll').resize();
		}else {
			$scope.wMore = false;
		}
		$scope.defaultCallBack();
	};

	$scope.setBloodPre = function(){
		var diastoleVal = document.getElementById('hh_diastoleVal').value,
			contractVal = document.getElementById('hh_contractVal').value;
		if(diastoleVal && contractVal){
			if(/^[0-9]*$/.test(diastoleVal) && /^[0-9]*$/.test(contractVal)){
				var param = {
					dbp: parseInt(diastoleVal),
					sbp: parseInt(contractVal),
					inputDate: $scope.inDateBPDel
				};
				hhs.setBloodPre(param, true)
					.success($scope.saveDataCallBack)
					.error(function(){
						$scope.nativeTip($scope.errorMsg);
					});
			}else {
				$scope.nativeTip('请输入正确的血压值');
			}
		}
	};

	$scope.setHeartRate = function(){
		var heartRateVal = document.getElementById('hh_heartRateVal').value;
		if(heartRateVal){
			if(/^[0-9]*$/.test(heartRateVal)){
				var param = {
					heartRate: parseInt(heartRateVal),
					inputDate: $scope.inDateHRDel
				};
				hhs.setBloodPre(param, true)
					.success($scope.saveDataCallBack)
					.error(function(){
						$scope.nativeTip($scope.errorMsg);
					});
			}else {
				$scope.nativeTip('请输入正确的心率值');
			}
		}
	};

	$scope.setWeight = function(){
		var weightVal = document.getElementById('hh_weightVal').value;
		if(weightVal){
			if(/^[0-9]*$/.test(weightVal)){
				var param = {
					bodyMass: parseInt(weightVal),
					inputDate: $scope.inDateWDel
				};
				hhs.setBloodPre(param, true)
					.success($scope.saveDataCallBack)
					.error(function(){
						$scope.nativeTip($scope.errorMsg);
					});
			}else {
				$scope.nativeTip('请输入正确的体重值');
			}
		}
	};

	$scope.saveDataCallBack = function(rsp){
		if(rsp.code === $scope.rspState.success){
			$scope.nativeTip('保存成功');
			$scope.initHealMag();
		}
	};

	$scope.defaultHealMagVal = function(){
		document.getElementById('hh_diastoleVal').value = '80';
		document.getElementById('hh_contractVal').value = '120';
		document.getElementById('hh_heartRateVal').value = '70';
		document.getElementById('hh_weightVal').value = '60';
	};

	$scope.showBloodPre = function(){
		$scope.isHeartRate = false;
		$scope.isWeight = false;
		$scope.isBloodPre = true;
		$scope.initInputDate();
	};

	$scope.showHeartRate = function(){
		$scope.isBloodPre = false;
		$scope.isWeight = false;
		$scope.isHeartRate = true;
		$scope.initInputDate();
	};

	$scope.showWeight = function(){
		$scope.isBloodPre = false;
		$scope.isHeartRate = false;
		$scope.isWeight = true;
		$scope.initInputDate();
	};

	$scope.selectDateBP = function(){
		var options = {
			format: 'w-h-m',
			rightBtnCallback: function(rtnDate){
				$scope.inDateBPDel = $scope.inDateBloodPre = rtnDate;
				document.getElementById('hh_bloodPreDate').innerText = rtnDate;
			}
		};
		$scope.nativeDate(options);
	};

	$scope.selectDateHR = function(){
		var options = {
			format: 'w-h-m',
			rightBtnCallback: function(rtnDate){
				$scope.inDateHRDel = $scope.inDateHeartRate = rtnDate;
				document.getElementById('hh_heartRateDate').innerText = rtnDate;
			}
		};
		$scope.nativeDate(options);
	};

	$scope.selectDateW = function(){
		var options = {
			format: 'w-h-m',//时间的格式
			rightBtnCallback: function(rtnDate){
				$scope.inDateWDel = $scope.inDateWeight = rtnDate;
				document.getElementById('hh_weightDate').innerText = rtnDate;
			}
		};
		$scope.nativeDate(options);
	};

	$scope.historyItemEvent = function(item){
		as.hideFooterMenu();
		$state.go('app.medicalDetail', {visitNo: item.visitNo});
	};

	$scope.listenH5Event('app_healthHistory');
}]
);
