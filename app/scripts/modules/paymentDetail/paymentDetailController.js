'use strict';
angular.module('RstFrontH5')
.controller('paymentDetailController',
['$rootScope','$scope', '$ionicPopup','$ionicBackdrop','$state', '$ionicScrollDelegate','$ionicSlideBoxDelegate','paymentDetailService', 'ApiService',
function($rootScope,$scope, $ionicPopup,$ionicBackdrop,$state, $ionicScrollDelegate,$ionicSlideBoxDelegate,pds, as) {
	
	$scope.paymentTitle ='缴费记录';
	$scope.paymentDetailSlideIndex=0;//第一页的滚轮下标值
	$scope.insuranceDetailSlideIndex=0;//第二页的滚了下标值
	
	$scope.showArrowUp = false;//默认显示图标剪头向下
	$scope.callSuccessed = false;//网络链接问题

	$scope.latestYear = new Date().getFullYear();//默认设置选择的年为当前年
	$scope.latestMonth = new Date().getMonth()+1;
	$scope.earliestYear = $scope.latestYear;
	
	$scope.storeLatestYear = [];
	$scope.storeInsurances=[];
	
	//第一次加载页面时，获取已缴费的最近年月记录
	$scope.initPayDetail = function(year,month){
		$scope.callSuccessed = false;
		$scope.storeLatestYear = [];
		if(!year) year ='';
		if(!month) month ='';
		//初始化一个滚轮界面
		var tempPayment = $scope.createEmptyPay(year,month);
		$scope.storeLatestYear[0] = tempPayment;
		pds.getPaymentInfoByYearMonth({year:year,month:month}, true)
			.success(function(rsp){
				$scope.connectionIssue = false;
				//如果没有最近一条记录，会现实当前年月的空数据
				if(rsp && rsp.code === pds.success){
					var body = rsp.body||{};
					if(body && body.paymentList && body.paymentList.length){
						$scope.callSuccessed = true;
						var currentYear = +body.currentYear;
						var currentMonth = +body.currentMonth;
						$scope.earliestYear = +body.yearList[body.yearList.length-1].paymentYear;
						$scope.latestYear = +body.yearList[0].paymentYear;
						$scope.latestMonth = +body.currentMonth;
						//该月份有数据
						body.hasPayYearDetail = true;
						$scope.storeLatestYear[0] = body;
						$ionicSlideBoxDelegate.$getByHandle('paymentHandle').update();
					} 
				}
				if(!$scope.callSuccessed){
					$scope.connectionIssue = true;
					tempPayment.hasPayYearDetail = false;
					$scope.storeLatestYear[0] = tempPayment;
				}
				$ionicSlideBoxDelegate.$getByHandle('paymentHandle').update();
			})
			.error(function(){
				$scope.connectionIssue = true;
				$scope.createErrorPay('','');
			});
	};
	
	$scope.slideRightYear = function(){
		var tempPayment = $scope.storeLatestYear[0];
		var currentMonth = +tempPayment.currentMonth;
		var currentYear = +tempPayment.currentYear;
		if(+currentMonth===12){
			currentMonth = 1;
			currentYear = +currentYear+1;
		}else{
			currentMonth = +currentMonth+1;
		}
		currentMonth = "00"+currentMonth;
		currentMonth = currentMonth.substr(currentMonth.length-2);
		if(parseInt(currentYear)<parseInt($scope.latestYear)){
			$scope.initPayDetail(currentYear,currentMonth);
		}else if(parseInt(currentYear)===parseInt($scope.latestYear) && parseInt(currentMonth)<= parseInt($scope.latestMonth)){
			$scope.initPayDetail(currentYear,currentMonth);
		}
	};
	
	$scope.slideLeftYear = function(){
		var tempPayment = $scope.storeLatestYear[0];
		var currentMonth = +tempPayment.currentMonth;
		var currentYear = +tempPayment.currentYear;
		if(+currentMonth===1){
			currentMonth=12;
			currentYear = +currentYear-1;
		}else{
			currentMonth = +currentMonth-1;
		}
		currentMonth = "00"+currentMonth;
		currentMonth = currentMonth.substr(currentMonth.length-2);
		if(parseInt(currentYear)>=parseInt($scope.earliestYear)){
			$scope.initPayDetail(currentYear,currentMonth);
		}
	};
	
	$scope.slideRightInsurance = function(){
		var tempInsurance= $scope.storeInsurances[0];
		var insuranceType = tempInsurance.insuranceType
		var currentYear = +tempInsurance.insuranceYear;
		currentYear = +currentYear+1;
		
		if(parseInt(currentYear)<=parseInt($scope.latestYear)){
			$scope.initInsuranceDetail(insuranceType,currentYear);
		}
	};
	
	$scope.slideLeftInsurance = function(){
		var tempInsurance= $scope.storeInsurances[0];
		var insuranceType = tempInsurance.insuranceType
		var currentYear = +tempInsurance.insuranceYear;
		currentYear = +currentYear-1;
		
		if(parseInt(currentYear)>=parseInt($scope.earliestYear)){
			$scope.initInsuranceDetail(insuranceType,currentYear);
		}
	};
	
	//查看具体的险种数据
	$scope.showPayYearDetail = function(insurance,year){
		$state.go('app.insuranceDetail',{latestYear:$scope.latestYear,earliestYear:$scope.earliestYear,insuranceType:insurance.insuranceType,selectedPaymentYear:year});
	};
	
	//初始化险种数据
	$scope.createSlidesForMonth = function(){
		$scope.showArrowUp = false;
		var params = $state.params;
		$scope.latestYear = params.latestYear;
		$scope.earliestYear = params.earliestYear;
		$scope.selectedPaymentYear = params.selectedPaymentYear;
		$scope.selectInsuranceType = params.insuranceType;
		$scope.initInsuranceDetail($scope.selectInsuranceType,$scope.selectedPaymentYear);
	};
	
	//初始化险种数据
	$scope.initInsuranceDetail = function(insuranceType,year){
		$scope.paymentTitle = insuranceType;
		$scope.callSuccessed = false;
		$scope.storeInsurances = [];
		//初始化一个滚轮界面
		var tempInsurance = $scope.createEmptyInsurance(insuranceType,year);
		$scope.storeInsurances[0] = tempInsurance;
		pds.getInsuranceOfPayByYear({insuranceType:insuranceType, year:year}, true)
			.success(function(rsp){
				$scope.connectionIssue = false;
				if(rsp && rsp.code === pds.success){
					var body = rsp.body || {};
					if(body && typeof(body)==='string'){
						body = JSON.parse(body);
					}
					if(body && body.insuranceDetailList && body.insuranceDetailList.length){
						$scope.callSuccessed = true;
						$scope.storeInsurances[0] = $scope.createInsuranceForMonth(body,insuranceType,year);
						$ionicSlideBoxDelegate.$getByHandle('insuranceHandle').update();
					}
				}
				if(!$scope.callSuccessed){
					$scope.connectionIssue = true;
					tempInsurance.hasInsuranceDetail= false;
					$scope.storeInsurances[0] = tempInsurance;
				}
			})
			.error(function(){
				$scope.connectionIssue = true;
				$scope.storeInsurances =[];
				var temp = $scope.createEmptyInsurance(insuranceType,year);
				temp.hasInsuranceDetail = false;
				$scope.storeInsurances[0] =temp;
				$ionicSlideBoxDelegate.$getByHandle('insuranceHandle').update();
			});
	};
	
	$scope.goPreviouPage = function(){
		//$state.go('app.paymentDetail');
		history.go(-1);
	};
	
	$scope.createErrorPay = function(year,month){
		$scope.storeLatestYear =[];
		var temp = $scope.createEmptyPay(year,month);
		temp.hasPayYearDetail = false;
		$scope.storeLatestYear[0] =temp;
		$ionicSlideBoxDelegate.$getByHandle('paymentHandle').update();
	};
	
	//为某一个年月初始化数据
	$scope.createEmptyPay = function(year,selectMonth){
		var storeEmptyYear = {};
		if(selectMonth){
	 		selectMonth = '0'+selectMonth;
	 		selectMonth = selectMonth.substr(selectMonth.length-2);
	 	}
		storeEmptyYear.companySum = '0';
		storeEmptyYear.currentMonth=selectMonth;
		storeEmptyYear.currentYear=''+year;
		storeEmptyYear.paymentList=[];
		storeEmptyYear.personSum='0';
		storeEmptyYear.yearList=[];
		storeEmptyYear.hasPayYearDetail = true;
		return storeEmptyYear;
	};
	//初始化空数据的对象
	$scope.createEmptyInsurance = function(insuranceType,currentYear){
		var storeEmptyInsurance = {};
		storeEmptyInsurance.companyPay="0";
		storeEmptyInsurance.insuranceDetailList =[];
		storeEmptyInsurance.hasInsuranceDetail = true;//默认不能空
		storeEmptyInsurance.personPay="0";
		storeEmptyInsurance.insuranceType =insuranceType; 
		storeEmptyInsurance.insuranceYear = ''+currentYear;
		return storeEmptyInsurance;
	};
	//每个都初始化数据，然后比较哪个月有数据
	$scope.createInsuranceForMonth = function(body,insuranceType,year){
		var tempInsurance = {};
		tempInsurance.companyPay = body.companyPay;
		tempInsurance.personPay = body.personPay;
		tempInsurance.insuranceYear = ''+year;
		tempInsurance.insuranceType = insuranceType;
		tempInsurance.insuranceDetailList = [];
		tempInsurance.hasInsuranceDetail =true;
		for(var i =12;i>0;i--){
			var temp = {};
			var itemList = checkMonthIsPayed(body.insuranceDetailList,i);
			if(itemList.length!==0){
				for(var j =0;j<itemList.length;j++){
					tempInsurance.insuranceDetailList.push(itemList[j]);
				}
			}else{
				var tempMonth = "0"+i;
				temp.paymentMonth = tempMonth.substr(tempMonth.length-2);
				temp.isPayedState = false;
				temp.arrivalStatus="未缴纳";//0 未缴纳 1 未到账 2已到账
				temp.companyPaymentAmount="0.00";
				temp.paymentBase="0.00";
				temp.paymentAmount="0.00";
				temp.personalPaymentAmount="0.00";
				tempInsurance.insuranceDetailList.push(temp);
			}
		}
		return tempInsurance;
	};
	//验证当前月是否有数据
	var checkMonthIsPayed = function(insuranceDetailList,month){
		var list =[];
		for(var i=0;i<insuranceDetailList.length;i++){
			if(parseInt(insuranceDetailList[i].paymentMonth)===month){
				var temp = insuranceDetailList[i];
					temp.isPayedState = true;
					list.push(temp);
			}
		}
		return list;
	};
	
	//初始化险种数据
	$scope.selectSlideInsuranceDetail = function(year){
		$scope.initInsuranceDetail($scope.selectInsuranceType,year);
	};
	$scope.showArrowUpForPay = function(){
		if($scope.showArrowUp){
			$scope.showArrowUp = false;
		}else{
			$scope.showArrowUp = true;
		}
		
		if($scope.showArrowUp){
			var options = {
				format          :'y-m',
				yearStart       : '',
				yearEnd         : '',
				leftBtnCallback : function (left) {
					$scope.showArrowUp = false;
				},
				rightBtnCallback: function(right){
					$scope.showArrowUp = false;
					var dateArray = right.split("-");
					$scope.initPayDetail(dateArray[0],dateArray[1]);
				}};
			$scope.nativeDate(options);
		}
		//$scope.initPayDetail(2001,'01');
	};
	
	$scope.showArrowUpForInsurance = function(){
		
		if ($scope.showArrowUp) {
			$scope.showArrowUp = false;
		}else{
			$scope.showArrowUp = true;
		}
		if ($scope.showArrowUp) {
			var options = {
				format          : 'y',
				yearStart       : '',
				yearEnd         : '',
				leftBtnCallback : function (left) {
					$scope.showArrowUp = false;
				},
			    rightBtnCallback: function (right) {
			   	 	$scope.showArrowUp = false;
				 	$scope.selectSlideInsuranceDetail(right);
			    }};
			$scope.nativeDate(options);
		}
		//$scope.selectSlideInsuranceDetail(2013);
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
	};
	$scope.listenH5Event('app_paymentDetail');
}]
);