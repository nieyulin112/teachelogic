'use strict';
angular.module('RstFrontH5').factory('drugExpenseService', 
function($window, ApiService, drugExpenseFakeService){
	var isLocal = ApiService.isLocalEnv(),
		des = {};

	des.getHot = function(param, isNoHud){
		if(isLocal){
			return ApiService.requestFake(drugExpenseFakeService.getHot(), false);
		}else if(isNoHud){
			return ApiService.requestNoHud('get', '/open/drug/drugs.do', param);
		}else {
			return ApiService.request('get', '/open/drug/drugs.do', param, true);
		}
	}

	des.getDrugByKey = function(param, isNoHud){
		if(isLocal){
			return ApiService.requestFake(drugExpenseFakeService.getDrugByKey(), false);
		}else if(isNoHud){
			return ApiService.requestNoHud('get', '/open/drug/drugs.do', param);
		}else {
			return ApiService.request('get', '/open/drug/drugs.do', param, true);
		}
	};
	
	
	return des;
});