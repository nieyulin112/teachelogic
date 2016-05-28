'use strict';
angular.module('RstFrontH5')
.controller('hhStateController',
['$scope', '$state', '$ionicPopup', '$ionicScrollDelegate', '$filter', 'healHisService', 'ApiService',
function($scope, $state, $ionicPopup, $ionicScrollDelegate, $filter, hhs, as) {

	$scope.showHealMag = function(){
		$scope.isHealManage = true;
		if(!hhs.healMagInit){
			hhs.healMagInit = true;
			$scope.initInputDate();
			$scope.isBloodPre = true;
			$scope.initHealMag();
		}
	};

	$scope.initInputDate = function(){
		$scope.inDateBloodPre = $scope.inDateHeartRate = $scope.inDateWeight = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm');
		$scope.inDateBPDel = $scope.inDateHRDel = $scope.inDateWDel = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
	};

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
					var body = rsp.body;
					$scope.storeType = body.modes || [];
					$scope.storeDisease = [{diseaseName:'全部'}].concat(body.diseases || []);
					$scope.storeTime = ['全部'].concat(body.years || []).map(function(val){
						return {timeName:val};
					});
				}
			})
			.error(function(){
				$scope.nativeTip($scope.errorMsg);
			});
	};

	$scope.getDisHis = function(){
		if($scope.isFetching) return;
		$scope.isFetching = true;
		var param = {pageNum:$scope.hisPageNum, mode:parseInt($scope.currentType||0)};
		if($scope.currentYear && $scope.currentYear!=='全部'){
			param.year = parseInt($scope.currentYear);
		}
		if($scope.currentDisease && $scope.currentDisease!=='全部'){
			param.diseaseName = $scope.currentDisease;
		}
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

	$scope.showType = function(){
		$scope.isYear = false;
		$scope.isDisease = false;
		$scope.isType = !$scope.isType;
		$scope.isSift = true;
	};

	$scope.showYear = function(){
		$scope.isType = false;
		$scope.isDisease = false;
		$scope.isYear = !$scope.isYear;
		$scope.isSift = true;
	};

	$scope.showDisease = function(){
		$scope.isType = false;
		$scope.isYear = false;
		$scope.isDisease = !$scope.isDisease;
		$scope.isSift = true;
	};

	$scope.hideBackDrop = function(){
		$scope.isSift = false;
		$scope.isType = false;
		$scope.isYear = false;
		$scope.isDisease = false;
	};

	$scope.selectType = function(item){
		$scope.siftTypeName = item.name;
		$scope.activeType = item;
		$scope.hideBackDrop();

		$scope.cutYear = '';
		$scope.currentType = item.code;
		$scope.hisPageNum = 1;
		$scope.getDisHis();
	};

	$scope.selectTime = function(item){
		$scope.siftTimeName = item.timeName;
		$scope.activeTime = item;
		$scope.hideBackDrop();

		$scope.cutYear = '';
		$scope.currentYear = $scope.siftTimeName;
		$scope.hisPageNum = 1;
		$scope.getDisHis();
	};

	$scope.selectDisease = function(item){
		$scope.siftDiseaseName = item.diseaseName;
		$scope.activeDisease = item;
		$scope.hideBackDrop();

		$scope.cutYear = '';
		$scope.currentDisease = item.diseaseName;
		$scope.hisPageNum = 1;
		$scope.getDisHis();
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
			format: 'w-h-m',
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

	$scope.listenH5Event('app_healthHistory_state');
}]
);
