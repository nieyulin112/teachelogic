'use strict';
angular.module('RstFrontH5').factory('stuInsService', 
function($window, ApiService, stuInsFakeService){
	var isLocal = ApiService.isLocalEnv();
	var sis = {
		limit: 20,
		success: 10000,
		emptyMsg: '查询数据为空',
		errorMsg: '操作失败，请检查网络连接成功后再重试'
	};
	
//	学校模糊搜索
	sis.getSchoolByKey = function(param, isNoHud){
		if(isLocal){
			return ApiService.requestFake(stuInsFakeService.getSchoolByKey(), false);
		}else if(isNoHud){
			return ApiService.requestNoHud('get', '/open/studentSocialSecurity/getSchoolByName.do', param);
		}else {
			return ApiService.request('get', '/open/studentSocialSecurity/getSchoolByName.do', param, param.start===1);
		}
	};
	
//	班级模糊检索
	sis.getClassByKey = function(param, isNoHud){
		if(isLocal){
			return ApiService.requestFake(stuInsFakeService.getClassByKey(), false);
		}else if(isNoHud){
			return ApiService.requestNoHud('get', '/open/studentSocialSecurity/getClass.do', param);
		}else {
			return ApiService.request('get', '/open/studentSocialSecurity/getClass.do', param, true);
		}
	};
	
//	查询结果
	sis.getResult = function(param, isNoHud){
		if(isLocal){
			return ApiService.requestFake(stuInsFakeService.getResult(), false);
		}else if(isNoHud){
			return ApiService.requestNoHud('get', '/open/insuPolicy/list.do', param, true);
		}else {
			return ApiService.request('get', '/open/insuPolicy/list.do', param, true);
		}
	};
	
//	保单详情
	sis.getDetail = function(param, isNoHud){
		if(isLocal){
			return ApiService.requestFake(stuInsFakeService.getDetail(), false); 
		}else if(isNoHud){
			return ApiService.requestNoHud('get', '/open/insuPolicy/show.do', param, true);
		}else {
			return ApiService.request('get', '/open/insuPolicy/show.do', param, true);
		}
	}
	
//	刷新保单详情
	sis.refreshDetail = function(param, isNoHud){
		if(isLocal){
			return ApiService.requestFake(stuInsFakeService.refreshDetail(), false); 
		}else if(isNoHud){
			return ApiService.requestNoHud('get', '/open/insuPolicy/showPayInfo.do', param, true);
		}else {
			return ApiService.request('get', '/open/insuPolicy/showPayInfo.do', param, true);
		}
	}
	
	return sis;
});