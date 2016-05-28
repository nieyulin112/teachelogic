'use strict';
angular.module('RstFrontH5').factory('paymentDetailService', 
function($window, ApiService, paymentDetailFakeService){
	var isLocal = ApiService.isLocalEnv();
	var pfs = {
		success: 10000,
		limit: 20,
		emptyMsg: '查询数据为空',
		errorMsg: '操作失败，请检查网络连接成功后再重试'
	};
	
	pfs.getPaymentInfoByYearMonth = function(param, isNoHud){
		if(isLocal){
			return ApiService.requestFake(paymentDetailFakeService.getPaymentInfoByYearMonth());
		}else if(isNoHud){
			return ApiService.requestNoHud('get', '/security/paymentInfoByMonth.do', param);
		}else {
			return ApiService.request('get', '/security/paymentInfoByMonth.do', param, true);
		}
	};
	pfs.getPaymentInfoByYearMonthSearch = function(param, isNoHud){
		return ApiService.requestFake(paymentDetailFakeService.getPaymentInfoByYearMonthSearch());
	};
	
	pfs.getInsuranceOfPayByYear = function(param, isNoHud){
		if(isLocal){
			return ApiService.requestFake(paymentDetailFakeService.getInsuranceOfPayByYear());
		}else if(isNoHud){
			return ApiService.requestNoHud('get', '/security/insurancePaymentInfoByYear.do', param);
		}else {
			return ApiService.request('get', '/security/insurancePaymentInfoByYear.do', param, true);
		}
	};
	
	return pfs;
});