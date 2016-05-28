/*
 * author:nieyulin756
 * date:2015-11-15
 * 参保信息
 */
'use strict';

angular.module('RstFrontH5')
	.factory('insuranceInfoService',function($window,$timeout,$q, ApiService,insuranceInfoFakeService){

	var getInsuranceInfoData = function(isNoHud){
		var isLocalEnv = ApiService.isLocalEnv();
		var data = {};
		var url = '/security/profile/showPersonalInsurance.do';
		if(isLocalEnv){
			return ApiService.requestFake(insuranceInfoFakeService.getInsuranceInfoData(),false,false,0);
		}else if(isNoHud){
			return ApiService.requestNoHud('post',url,data,false);
		}else{
			return ApiService.request('post',url,data,false);
		}
	};

	return {
		
		getInsuranceInfoData: getInsuranceInfoData
	};
});