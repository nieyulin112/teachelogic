'use strict';
angular.module('RstFrontH5').factory('healHisService', 
function($window, $filter, ApiService, healHisFakeService){
	var isLocal = ApiService.isLocalEnv(),
		hhs = {};
	
	hhs.getSift = function(isNoHud){
		if(isLocal){
			return ApiService.requestFake(healHisFakeService.getSift());
		}else if(isNoHud){
			return ApiService.requestNoHud('get', '/security/medicalRecord/filters.do', {});
		}else {
			return ApiService.request('get', '/security/medicalRecord/filters.do', {}, true);
		}
	};
	
	hhs.getDisHis = function(param, isNoHud){
		if(isLocal){
			return ApiService.requestFake(healHisFakeService.getDisHis());
		}else if(isNoHud){
			return ApiService.requestNoHud('get', '/security/v2/medicalRecord/record.do', param);
		}else {
			return ApiService.request('get', '/security/v2/medicalRecord/record.do', param, true);
		}
	};
	
	hhs.getBloodPre = function(param, isNoHud){
		if(isLocal){
			return ApiService.requestFake(healHisFakeService.getBloodPre());
		}else if(isNoHud){
			return ApiService.requestNoHud('get', '/security/health/healthInfos.do', param);
		}else {
			return ApiService.request('get', '/security/health/healthInfos.do', param, true);
		}
	};
	
	hhs.setBloodPre = function(param, isNoHud){
		if(isLocal){
			var preList = healHisFakeService.getBloodPre();
			param.inputDate = $filter('date')(new Date(), 'yyyy/MM/dd HH:mm');
			preList.body.push(param);
			return ApiService.requestFake(preList);
		}else if(isNoHud){
			return ApiService.requestNoHud('post', '/security/health/healthInfo.do', param);
		}else {
			return ApiService.request('post', '/security/health/healthInfo.do', param, true);
		}
	};
	
	hhs.getHisDetail = function(d, isNoHud) {
	    	var url = '/security/medicalRecord/detail.do',
	    		data = {visitNo:d};
	    	if(isLocal) {
			return ApiService.requestFake(healHisFakeService.getHisDetail(),false,false,200);
		}else if(isNoHud){
			return ApiService.requestNoHud('get',url,data);
		}else{
			return ApiService.request('get',url,data,false);
		}
    };
    
    hhs.getPillDetail = function(param, isNoHud){
		var url = '/security/medicalRecord/pillDetail.do';
		if(isLocal) {
			return ApiService.requestFake(healHisFakeService.getPillDetail(),false,false,0);
		}else if(isNoHud){
			return ApiService.requestNoHud('get',url,param);
		}else{

			return ApiService.request('get',url,param,false);
		}	
	};
    
	return hhs;
});